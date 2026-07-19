import asyncio
import io
import wave
import cv2
import os
import numpy as np
import json as json_lib
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Import the LangChain tools
from agents.listing_tools import (
    transcribe_audio,
    analyze_product_image,
    check_category_mismatch,
    generate_listing_content,
    score_return_risk,
    check_pincode_risk
)

# Temporary file paths
TEMP_AUDIO = "temp_test_audio.wav"
TEMP_IMAGE = "temp_test_image.jpg"

def create_temp_files():
    """Generates valid WAV audio and JPEG image files locally for the tests."""
    # Write a 1-second WAV silence file
    wav_io = io.BytesIO()
    with wave.open(wav_io, 'wb') as wav_file:
        wav_file.setnchannels(1)
        wav_file.setsampwidth(2)
        wav_file.setframerate(16000)
        wav_file.writeframes(b'\x00\x00' * 16000)
    with open(TEMP_AUDIO, "wb") as f:
        f.write(wav_io.getvalue())
        
    # Write a grey product box JPEG image file
    img = np.zeros((400, 400, 3), dtype=np.uint8) + 120
    cv2.rectangle(img, (100, 100), (300, 300), (255, 240, 240), -1)
    cv2.putText(img, "KURTI PRODUCT", (120, 210), cv2.FONT_HERSHEY_SIMPLEX, 0.8, (0, 0, 0), 2)
    success, encoded_img = cv2.imencode('.jpg', img)
    if success:
        with open(TEMP_IMAGE, "wb") as f:
            f.write(encoded_img.tobytes())

def cleanup_temp_files():
    """Cleans up the temporary test files from the workspace."""
    for path in [TEMP_AUDIO, TEMP_IMAGE]:
        if os.path.exists(path):
            try:
                os.remove(path)
            except Exception as e:
                print(f"Could not remove temporary file {path}: {e}")

async def main():
    print("====================================================")
    print("      SHURUAAT AI LISTING AGENT TOOLS TEST          ")
    print("====================================================")
    
    # 1. Setup temporary resources
    create_temp_files()
    
    try:
        # 1. Test transcribe_audio (async tool)
        print("\n[1] Tool: transcribe_audio...")
        res_transcribe = await transcribe_audio.ainvoke({"audio_ref": TEMP_AUDIO})
        print(f" -> Result: {res_transcribe}")
        
        # 2. Test analyze_product_image (async tool)
        print("\n[2] Tool: analyze_product_image...")
        res_analyze = await analyze_product_image.ainvoke({
            "image_ref": TEMP_IMAGE,
            "declared_category": "kurti"
        })
        print(f" -> Result: {json_lib.dumps(res_analyze, ensure_ascii=True, indent=2)}")
        
        # 3. Test check_category_mismatch (sync tool)
        print("\n[3] Tool: check_category_mismatch...")
        detected_cat = res_analyze.get("detected_category", "kurti")
        res_mismatch_ok = check_category_mismatch.invoke({
            "declared_category": "kurti",
            "detected_category": detected_cat
        })
        res_mismatch_bad = check_category_mismatch.invoke({
            "declared_category": "footwear",
            "detected_category": detected_cat
        })
        print(f" -> Good Match Check: {res_mismatch_ok}")
        print(f" -> Bad Match Check:  {res_mismatch_bad}")
        
        # 4. Test generate_listing_content (async tool)
        print("\n[4] Tool: generate_listing_content...")
        sample_input = "Beautiful floral printed A-line cotton kurti with three-quarter sleeves. Highly comfortable."
        res_content = await generate_listing_content.ainvoke({
            "input_text": sample_input,
            "image_findings": res_analyze,
            "category": "kurti",
            "target_language": "Hindi"
        })
        print(" -> Generated Listing JSON:")
        print(json_lib.dumps(res_content, ensure_ascii=True, indent=2))
        
        # 5. Test score_return_risk (sync tool)
        print("\n[5] Tool: score_return_risk...")
        # Check risk score for the generated listing
        res_risk = score_return_risk.invoke({
            "listing": res_content,
            "category": "kurti"
        })
        print(f" -> Result: {json_lib.dumps(res_risk, ensure_ascii=True, indent=2)}")
        
        # 6. Test check_pincode_risk (sync tool)
        print("\n[6] Tool: check_pincode_risk...")
        res_pincode_delhi = check_pincode_risk.invoke({"pincode": "110001"})
        res_pincode_patna = check_pincode_risk.invoke({"pincode": "800001"})
        res_pincode_unknown = check_pincode_risk.invoke({"pincode": "999999"})
        print(f" -> Delhi (110001):   {res_pincode_delhi}")
        print(f" -> Patna (800001):   {res_pincode_patna}")
        print(f" -> Unknown (999999): {res_pincode_unknown}")
        
    finally:
        cleanup_temp_files()

if __name__ == "__main__":
    asyncio.run(main())
