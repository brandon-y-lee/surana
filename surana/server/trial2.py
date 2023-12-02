import openai


openai.apiKey = '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'

response = openai.Completion.create(
    engine="text-davinci-003",  # Choose an engine (e.g., text-davinci-003)
    prompt="Generate a list of three questions in python",
    max_tokens=50
)

print(response['choices'][0]['text'].strip())

