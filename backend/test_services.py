import asyncio
import io
import wave
import cv2
import numpy as np
from dotenv import load_dotenv

# Load env variables from .env if present
load_dotenv()

from services import llm_client
from services import sarvam_client
from services import vision_client

def get_dummy_wav_bytes() -> bytes:
    """Generates standard 16-bit PCM 16kHz WAV silence bytes in memory."""
    wav_io = io.BytesIO()
    with wave.open(wav_io, 'wb') as wav_file:
        wav_file.setnchannels(1)
        wav_file.setsampwidth(2)
        wav_file.setframerate(16000)
        # Write 1.5 seconds of silence (24000 frames)
        wav_file.writeframes(b'\x00\x00' * 24000)
    return wav_io.getvalue()

def get_dummy_image_bytes(draw_sharp: bool = True) -> bytes:
    """Generates a dummy product image in memory."""
    # Create gray square
    img = np.zeros((400, 400, 3), dtype=np.uint8) + 120
    if draw_sharp:
        # Draw a sharp rectangle representing a product
        cv2.rectangle(img, (100, 100), (300, 300), (255, 240, 240), -1)
        cv2.putText(img, "KURTI FABRIC", (120, 210), cv2.FONT_HERSHEY_SIMPLEX, 0.8, (0, 0, 0), 2)
    else:
        # Draw a blurry box (by applying Gaussian blur)
        cv2.rectangle(img, (100, 100), (300, 300), (255, 240, 240), -1)
        img = cv2.GaussianBlur(img, (25, 25), 0)
        
    success, encoded_img = cv2.imencode('.jpg', img)
    if not success:
        raise ValueError("Failed to encode dummy image")
    return encoded_img.tobytes()

async def main():
    print("====================================================")
    print("      SHURUAAT AI SERVICES STANDALONE TEST          ")
    print("====================================================")
    
    # 1. Test LLM client generate_structured
    print("\n[1] Testing LLM generate_structured...")
    prompt = "Describe a traditional Indian dress (kurti) with keys: 'name', 'fabric', 'description'."
    target_language = "Hindi"
    print(f"Prompt: {prompt}")
    print(f"Target Language: {target_language}")
    try:
        res = await llm_client.generate_structured(prompt, target_language)
        print(" -> Success! Response JSON:")
        import json as json_lib
        print(json_lib.dumps(res, ensure_ascii=True, indent=2))
    except Exception as e:
        print(f" -> Error testing generate_structured: {e}")

    # 2. Test Vision client blur_score (local processing)
    print("\n[2] Testing Vision blur_score (local OpenCV calculations)...")
    sharp_bytes = get_dummy_image_bytes(draw_sharp=True)
    blurry_bytes = get_dummy_image_bytes(draw_sharp=False)
    try:
        sharp_res = vision_client.blur_score(sharp_bytes)
        blurry_res = vision_client.blur_score(blurry_bytes)
        print(f" -> Sharp Image results: {sharp_res}")
        print(f" -> Blurry Image results: {blurry_res}")
    except Exception as e:
        print(f" -> Error testing blur_score: {e}")

    # 3. Test Vision client analyze_image (multimodal LLM)
    print("\n[3] Testing Vision analyze_image (Gemini Multimodal)...")
    try:
        res = await vision_client.analyze_image(sharp_bytes)
        print(" -> Success! Response JSON:")
        print(res)
    except Exception as e:
        print(f" -> Error testing analyze_image: {e}")

    # 4. Test Sarvam client transcribe
    print("\n[4] Testing Sarvam transcribe...")
    audio_bytes = get_dummy_wav_bytes()
    print("Sending 1.5s dummy WAV silence to Sarvam...")
    try:
        res = await sarvam_client.transcribe(audio_bytes, language_hint="en-IN")
        print(" -> Success! Response JSON:")
        print(res)
    except Exception as e:
        print(f" -> Error testing transcribe: {e}")

if __name__ == "__main__":
    asyncio.run(main())
