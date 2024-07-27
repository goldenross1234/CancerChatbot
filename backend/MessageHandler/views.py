from django.shortcuts import render
from django.http import HttpResponse
from transformers import AutoModelForCausalLM, AutoTokenizer, TextStreamer

from transformers import AutoModelForCausalLM, AutoTokenizer, TextStreamer

class LLMModel():
    # Load the llama model in the /llm_model
    def __init__(self):
        # Load the model and tokenizer
        self.model_path = "MessageHandler/llm_model"
        self.model = AutoModelForCausalLM.from_pretrained(self.model_path)
        self.tokenizer = AutoTokenizer.from_pretrained(self.model_path)

        # Define the prompt template
        self.alpaca_prompt = """
        ### Instruction:
        {}


        ### Response:
        {}
        """

    def get_message(self, user_input):
        input_text = self.alpaca_prompt.format(user_input, "")
        inputs = self.tokenizer(input_text, return_tensors="pt").to("cuda")
        outputs = self.model.generate(**inputs, penalty_alpha=0.6, top_k=4, max_new_tokens=100)

        # Get the text from the outputs
        text = self.tokenizer.batch_decode(outputs, skip_special_tokens=True)
        print(text)

        # Return the generated text
        return text


# Create the model
_main_model = LLMModel()

# Create your views here.
def index(request):
    return HttpResponse("Hello, world. You're at the MessageHandler index.")

# Make this a post request
def user_input_message(request):
    message = _main_model.get_message("What is life?")
    return HttpResponse(message)