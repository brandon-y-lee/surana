# # from pydub import AudioSegment
# # from google.cloud import speech_v1p1beta1 as speech
# # import re
# # import nltk
# # from nltk import pos_tag, word_tokenize
# # from nltk.corpus import stopwords
# # from textblob import TextBlob
# # import syllables
# # from openai import OpenAI
# # import spacy
# # from textblob import TextBlob
# # import syllables
from openai import OpenAI

trial = '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'
client = OpenAI(api_key=trial)

# openai.api_key = trial
# response = openai.Completion.create(
#     engine="text-davinci-003",
#     prompt="Once upon a time in a",
#     max_tokens=50
# )
# print(response['choices'][0]['text'].strip())
# nltk.download('punkt')
# nltk.download('averaged_perceptron_tagger')
# nltk.download('stopwords')


# # def find_text(file_path):
# #     # Split the transcribed text into words
# #     try:
# #         with open(file_path, "r", encoding="utf-8") as file:
# #             transcribed_text = file.read()
# #             print("File content:")
# #             print(transcribed_text)
# #     except FileNotFoundError:
# #         print(f"Error: File not found at {file_path}")
# #     except Exception as e:
# #         print(f"An error occurred: {e}")
# #     return transcribed_text

# def count_pauses(audio_path, pause_duration_ms=1000):
#     sound = AudioSegment.from_wav(audio_path)
#     pauses = 0

#     for i in range(0, len(sound), pause_duration_ms):
#         segment = sound[i:i + pause_duration_ms]
#         if segment.dBFS < -30:  # Adjust the threshold based on your audio characteristics
#             pauses += 1

#     return pauses


# def count_word_frequency(transcribed_text, filler_words):
#     words = re.findall(r'\b\w+\b', transcribed_text.lower())
#     dic = {}
#     count = 0
#     for word in words:
#         if word in fillers:
#             if word in dic:
#                 dic[word] += 1
#             else:
#                 dic[word] = 1
#             count += 1
#     return dic, count


# def find_adjectives_and_adverbs(text):
#     # Tokenize the text into words
#     words = word_tokenize(text)
#     stop_words = set(stopwords.words("english"))
#     words = [word.lower() for word in words if word.isalnum() and word.lower() not in stop_words]

#     # Perform part-of-speech tagging
#     pos_tags = pos_tag(words)
#     # Extract adjectives and adverbs
#     adjectives = [word for word, pos in pos_tags if pos.startswith('JJ')]
#     adverbs = [word for word, pos in pos_tags if pos.startswith('RB')]
#     return adjectives, adverbs

# def find_complex_words(text):
#     # Tokenize the text into words
#     words = word_tokenize(text)
#     # Remove stopwords
#     stop_words = set(stopwords.words("english"))
#     words = [word.lower() for word in words if word.isalnum() and word.lower() not in stop_words]
#     # Find and output complex words (words with more than two syllables)
#     complex_words = [word for word in words if syllables.estimate(word) > 2]
#     return complex_words

# def find_sentence_lengths(text):
#     nlp = spacy.load("en_core_web_sm")
#     doc = nlp(text)
#     sentence_lengths = [len(sent) - 1 for sent in doc.sents]
#     return sentence_lengths

# def find_repeated_words(text, words_to_exclude):
#     # Find all repeated words in the text, excluding specified words
#     words = re.findall(r'\b\w+\b', text.lower())  # Extract all words in lowercase
#     filtered_words = [word for word in words if word not in words_to_exclude]
#     repeated_words = set(word for word in set(filtered_words) if filtered_words.count(word) > 1)
#     return repeated_words

# def find_transition_words(text, transition_words):
#     words = re.findall(r'\b\w+\b', text.lower())
#     word_counts = {word: words.count(word) for word in transition_words}
#     word_counts = {word: count for word, count in word_counts.items() if count > 0}
#     total_unique_transition = len(word_counts)
#     return word_counts, total_unique_transition

# def count_sentences(text):
#     sentences = nltk.sent_tokenize(text)
#     return len(sentences)

# transition_words = ['however', 'in addition', 'moreover', 'nevertheless', 'furthermore', 'meanwhile', 'consequently', 'therefore', 'nonetheless', 'thus', 'hence', 'subsequently', 'likewise', 'comparatively', 'similarly', 'accordingly', 'indeed', 'otherwise', 'regardless', 'henceforth', 'alternatively', 'simultaneously', 'otherwise', 'likewise', 'notwithstanding', 'besides', 'conversely', 'on the other hand', 'on the contrary', 'in contrast', 'for example', 'for instance', 'in particular', 'specifically', 'such as', 'including', 'particularly', 'especially', 'in other words', 'to illustrate', 'to clarify', 'to explain', 'namely', 'as a result', 'in summary', 'in conclusion', 'to sum up', 'overall', 'to put it differently', 'to repeat', 'to emphasize', 'chiefly', 'notably', 'in fact', 'indeed', 'of course', 'certainly', 'to be sure', 'surprisingly', 'unquestionably', 'undoubtedly', 'to compare', 'to contrast', 'in comparison', 'similarly', 'likewise', 'in a similar fashion', 'in the same way', 'by the same token', 'in like manner', 'more importantly', 'equally important', 'similarly', 'not to mention', 'coupled with', 'together with', 'in addition to', 'besides', 'apart from', 'in other words', 'for example', 'for instance', 'specifically', 'to illustrate', 'as an illustration', 'chiefly', 'especially', 'particularly', 'moreover', 'furthermore', 'in fact', 'indeed', 'in addition', 'consequently', 'thus', 'hence', 'therefore', 'accordingly', 'as a result', 'because', 'for this reason', 'due to', 'since', 'so', 'so that', 'owing to', 'in order to', 'with this in mind', 'so as to', 'for the purpose of', 'lest', 'with this in mind', 'otherwise', 'to this end', 'with this purpose in mind', 'with this in mind', 'with this end in view', 'for fear that', 'lest', 'if', 'even if', 'unless', 'in case', 'granted that', 'supposing that', 'even though', 'although', 'though', 'while', 'whereas', 'despite', 'in spite of', 'notwithstanding', 'regardless', 'on the other hand', 'conversely', 'nevertheless', 'nonetheless', 'however', 'but', 'yet', 'still', 'on the contrary', 'instead', 'in contrast', 'by comparison', 'on the other hand', 'at the same time', 'simultaneously', 'meanwhile', 'on the other hand', 'at the same time', 'at this point', 'now', 'then', 'meanwhile', 'forthwith', 'immediately', 'without delay', 'first', 'second', 'third', 'finally', 'lastly', 'to begin with', 'in the first place', 'firstly', 'secondly', 'thirdly', 'in the first place', 'in the second place', 'in the third place', 'first', 'second', 'third', 'next', 'then', 'finally', 'lastly', 'to conclude', 'in conclusion', 'to sum up', 'in summary', 'overall', 'to put it differently', 'to repeat', 'to emphasize', 'chiefly', 'notably', 'indeed', 'in fact', 'of course', 'certainly', 'without a doubt', 'undoubtedly', 'unquestionably', 'especially', 'particularly', 'in this case', 'in any case', 'in either event', 'under those circumstances', 'in that case', 'if so', 'otherwise', 'else', 'or', 'at least', 'at any rate', 'in any event', 'besides', 'in addition', 'furthermore', 'moreover', 'further', 'also', 'and', 'besides', 'too', 'moreover', 'furthermore', 'again', 'and then', 'as well', 'equally important', 'similarly', 'likewise', 'in the same way', 'in like manner', 'in the first place', 'first', 'firstly', 'to begin with', 'for one thing', 'to start with', 'for one thing', 'to start with', 'at the same time', 'simultaneously', 'next', 'then', 'finally', 'lastly', 'in conclusion', 'to sum up', 'in summary', 'overall', 'to conclude', 'to put it briefly', 'in other words', 'in any case', 'in conclusion', 'in short', 'in brief', 'to sum up', 'all in all', 'in summary', 'to summarize', 'in essence', 'in summary', 'in short', 'in brief', 'in conclusion', 'to sum up', 'all in all', 'in summary', 'to summarize', 'in essence', 'in summary', 'in short', 'in brief', 'in conclusion', 'to sum up', 'all in all', 'in summary', 'to summarize', 'in essence', 'in summary', 'in short', 'in brief', 'in conclusion', 'to sum up', 'all in all', 'in summary', 'to summarize', 'in essence', 'in summary', 'in short', 'in brief', 'in conclusion', 'to sum up', 'all in all', 'in summary', 'to summarize', 'in essence', 'in summary', 'in short', 'in brief', 'in conclusion', 'to sum up', 'all in all', 'in summary', 'to summarize', 'in essence', 'in summary', 'in short', 'in brief', 'in conclusion', 'to sum up', 'all in all', 'in summary', 'to summarize', 'in essence', 'in summary', 'in short', 'in brief', 'in conclusion', 'to sum up', 'all in all', 'in summary', 'to summarize', 'in essence', 'in summary', 'in short', 'in brief', 'in conclusion', 'to sum up', 'all in all', 'in summary', 'to summarize', 'in essence', 'in summary', 'in short', 'in brief', 'in conclusion', 'to sum up', 'all in all', 'in summary', 'to summarize', 'in essence', 'in summary', 'in short', 'in brief', 'in conclusion', 'to sum up', 'all in all', 'in summary', 'to summarize', 'in essence', 'in summary', 'in short', 'in brief', 'in conclusion', 'to sum up', 'all in all', 'in summary', 'to summarize', 'in essence', 'in summary', 'in short', 'in brief', 'in conclusion', 'to sum up', 'all in all', 'in summary', 'to summarize', 'in essence', 'in summary', 'in short', 'in brief', 'in conclusion', 'to sum up', 'all in all', 'in summary', 'to summarize', 'in essence', 'in summary', 'in short', 'in brief', 'in conclusion', 'to sum up', 'all in all', 'in summary', 'to summarize', 'in essence', 'in summary', 'in short', 'in brief', 'in conclusion', 'to sum up', 'all in all', 'in summary', 'to summarize', 'in essence', 'in summary', 'in short', 'in brief', 'in conclusion', 'to sum up', 'all in all', 'in summary', 'to summarize', 'in essence', 'in summary', 'in short', 'in brief', 'in conclusion', 'to sum up', 'all in all', 'in summary', 'to summarize', 'in essence', 'in summary', 'in short', 'in brief', 'in conclusion', 'to sum up', 'all in all', 'in summary', 'to summarize', 'in essence', 'in summary', 'in short', 'in brief', 'in conclusion', 'to sum up', 'all in all', 'in summary', 'to summarize', 'in essence', 'in summary', 'in short', 'in brief', 'in conclusion', 'to sum up', 'all in all', 'in summary', 'to summarize', 'in essence', 'in summary', 'in short', 'in brief', 'in conclusion', 'to sum up', 'all in all', 'in summary', 'to summarize', 'in essence', 'in summary', 'in short', 'in brief', 'in conclusion', 'to sum up', 'all in all', 'in summary', 'to summarize', 'in essence', 'in summary', 'in short', 'in brief', 'in conclusion', 'to sum up', 'all in all', 'in summary', 'to summarize', 'in essence', 'in summary', 'in short', 'in brief', 'in conclusion', 'to sum up', 'all in all', 'in summary', 'to summarize', 'in essence', 'in summary', 'in short', 'in brief', 'in conclusion', 'to sum up', 'all in all', 'in summary', 'to summarize', 'in essence', 'in summary', 'in short', 'in brief', 'in conclusion', 'to sum up', 'all in all', 'in summary', 'to summarize', 'in essence', 'in summary', 'in short', 'in brief', 'in conclusion', 'to sum up', 'all in all', 'in summary', 'to summarize', 'in essence', 'in summary', 'in short', 'in brief', 'in conclusion', 'to sum up', 'all in all', 'in summary', 'to summarize', 'in essence', 'in summary', 'in short', 'in brief', 'in conclusion', 'to sum up', 'all in all', 'in summary', 'to summarize', 'in essence', 'in summary', 'in short', 'in brief', 'in conclusion', 'to sum up', 'all in all', 'in summary']
# exclude_list = set(['and', 'some', 'this', 'is', 'a', 'it', 'has', 'like', 'that', 'on', 'at', 'over', 'above', 'below', 'under', 'for', 'of', 'if'])
# text_path = "transcribed_text.txt"
# transcribed_text = "Hellooo, how are you doiing?"
# # audio_path = "final_recording.wav"
# fillers = set(['like', 'and', 'so', 'but'])
# filler_count, total_count_filler = count_word_frequency(transcribed_text, fillers)
# # pause_count = count_pauses(audio_path)
# adj_lst, adverb_lst = find_adjectives_and_adverbs(transcribed_text)
# complex_lst = find_complex_words(transcribed_text)
# lengths = find_sentence_lengths(transcribed_text)
# repeated_words = find_repeated_words(transcribed_text, exclude_list)
# transition_word_counts, total_unique_transition = find_transition_words(transcribed_text, transition_words)
# num_sentences = count_sentences(transcribed_text)

prompt = "Hello, how are you doing?"

# Make a request to the OpenAI API
response = client.completions.create(
  model="gpt-3.5-turbo-instruct",
  prompt=prompt,
  max_tokens=300,
  temperature=0
)

generated_text = response.choices[0].text
print(generated_text)

# print('Adj and Adv:', adj_lst, adverb_lst)
# print('Filler words:', filler_count, total_count_filler)
# # print("Number of pauses:", pause_count)
# print("list of complex words:", complex_lst)
# print("sentence lenghts: ", lengths)
# print("advice:", generated_text)
# print("repeated words:", repeated_words)
# print("transition words count:", transition_word_counts)

# def get_score(num_sentences, num_transition, num_complex, num_adj, num_adv, lst_sentence_lengths, num_repeated, num_pauses, num_filler):
#     score = 0
#     num_complex_norm = min(num_complex / num_sentences, 1)
#     num_adj_norm = min((num_adj / num_sentences) * 3/2, 1)
#     num_adv_norm = min((num_adv / num_sentences) * 3, 1)
#     num_transition_norm = min((num_transition / num_sentences) * 3, 1)
#     num_repeated_norm = min((num_repeated / num_sentences), 1)
#     num_pauses_norm = min((num_pauses / num_sentences), 1)
#     num_filler_norm = min((num_filler / num_sentences), 1)

#     num_short, num_long = 0, 0
#     for l in lst_sentence_lengths:
#         if l <= 8: 
#             num_short += 1
#         else:
#             num_long += 1
    
#     num_length_ratio_norm = min((num_short / num_long) / 4, 1)
#     values = {}
#     values['num_complex_norm'] = num_complex_norm
#     values['num_adj_norm'] = num_adj_norm
#     values['num_adv_norm'] = num_adv_norm
#     values['num_transition_norm'] = num_transition_norm
#     values['num_repeated_norm'] = num_repeated_norm
#     values['num_pauses_norm'] = num_pauses_norm
#     values['num_filler_norm'] = num_filler_norm

#     importance = {}
#     importance['num_complex_norm'] = 0.3
#     importance['num_adj_norm'] = 0.7
#     importance['num_adv_norm'] = 0.4 
#     importance['num_transition_norm'] = 0.4
#     importance['num_repeated_norm'] = 0.3
#     importance['num_pauses_norm'] = 0.3
#     importance['num_filler_norm'] = 0.7

#     paramters = ['num_complex_norm', 'num_adj_norm', 'num_adv_norm', 'num_transition_norm', 'num_repeated_norm', 'num_pauses_norm', 'num_filler_norm']
#     for parameter in paramters:
#         score += values[parameter] * importance[parameter]
    
#     return (score / 3.2) * 10

# score = get_score(count_sentences(transcribed_text), total_unique_transition, len(complex_lst), len(adj_lst), len(adverb_lst), lengths, len(repeated_words), total_count_filler)
# print("This is the score:", score)