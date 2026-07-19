import os
import httpx
from typing import Dict, Any, Optional

class SarvamError(Exception):
    """Custom exception raised when Sarvam API transcription fails."""
    pass

async def transcribe(audio_bytes: bytes, language_hint: Optional[str] = None) -> Dict[str, Any]:
    """
    Transcribes audio bytes using the Sarvam AI Speech-to-Text API.
    
    Parameters:
        audio_bytes (bytes): Binary audio content (WAV/MP3/etc.).
        language_hint (str): Specific BCP-47 language code (e.g. 'hi-IN').
                             If None, auto-detection ('unknown') is requested.
                             
    Returns:
        dict: A dictionary containing {'text': transcribed_text, 'detected_language': BCP-47_code}
    """
    api_key = os.getenv("SARVAM_API_KEY")
    if not api_key:
        raise SarvamError("SARVAM_API_KEY environment variable is not set")
    
    url = "https://api.sarvam.ai/speech-to-text"
    headers = {
        "api-subscription-key": api_key
    }
    
    language_code = language_hint if language_hint else "unknown"
    
    files = {
        "file": ("audio.wav", audio_bytes, "audio/wav")
    }
    
    data = {
        "model": "saaras:v3",
        "language_code": language_code,
        "mode": "transcribe"
    }
    
    async with httpx.AsyncClient() as client:
        try:
            response = await client.post(
                url,
                headers=headers,
                files=files,
                data=data,
                timeout=10.0
            )
            
            if response.status_code != 200:
                raise SarvamError(
                    f"Sarvam API request failed with status code {response.status_code}: {response.text}"
                )
            
            res_data = response.json()
            transcript = res_data.get("transcript")
            detected_language = res_data.get("language_code")
            
            return {
                "text": transcript,
                "detected_language": detected_language
            }
        except httpx.TimeoutException as e:
            raise SarvamError("Sarvam Speech-to-Text request timed out (10s limit)") from e
        except Exception as e:
            if not isinstance(e, SarvamError):
                raise SarvamError(f"Sarvam Speech-to-Text connection failed: {e}") from e
            raise
