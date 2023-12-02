import sounddevice as sd
import numpy as np
from pydub import AudioSegment
import assemblyai as aai

aai.settings.api_key = "4f0ddf1f025a468bb92a00208ed5b8b4"
transcriber = aai.Transcriber()

def record_and_save(segment_num):
    fs = 44100  # Sampling frequency
    duration = 20  # Recording duration in seconds
    wav_file_name = f"segment_{segment_num}.wav"

    print(f"Recording segment {segment_num}...")

    # Record audio in mono (1 channel)
    recording = sd.rec(int(fs * duration), samplerate=fs, channels=1, dtype='int16')
    sd.wait()

    # Save the recording as a WAV file
    save_as_wav(recording, wav_file_name)

    print(f"Segment {segment_num} saved as {wav_file_name}")
    return wav_file_name

def save_as_wav(audio_data, file_name):
    # Convert the raw audio data to an AudioSegment
    audio_segment = AudioSegment(
        audio_data.tobytes(),
        sample_width=2,  # 16-bit audio
        frame_rate=44100,  # Sample rate
        channels=1  # Mono
    )

    # Export the AudioSegment to a WAV file
    audio_segment.export(file_name, format="wav")

def transcribe_audio(file_path):
    transcript = transcriber.transcribe(file_path)
    return transcript.text, transcript.confidence

if __name__ == "__main__":
    num_segments = 1  # Set to 1 for recording one segment

    wav_files = []
    for i in range(1, num_segments + 1):
        wav_files.append(record_and_save(i))

    # Concatenate all segments into a single AudioSegment
    final_audio = sum(AudioSegment.from_file(wav_file) for wav_file in wav_files)

    # Export the final AudioSegment to a WAV file
    final_audio.export("final_recording.wav", format="wav")

    transcribed_text, confidence = transcribe_audio("final_recording.wav")

    with open("transcribed_text.txt", "w", encoding="utf-8") as file:
        file.write(transcribed_text)

    print(transcribed_text, confidence)
