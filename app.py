from flask import Flask, request, jsonify
import boto3
import json

app = Flask(__name__)

# Configure your AWS credentials and region
bedrock_runtime = boto3.client(
    service_name="bedrock-runtime",
    region_name="us-west-2",
    aws_access_key_id='ASIAUBPKIBSQUKZTBQHS',
    aws_secret_access_key='z7Kg0zuquGrrDr9BGNRNgJNp8IpkNvLXo1SUxrm7',
    aws_session_token='IQoJb3JpZ2luX2VjEKv//////////wEaCXVzLWVhc3QtMSJHMEUCIQDC5Oii3NoPK2tCM+Ez6W1fh+XdN0ggimpoUAOv0pUaEwIgfjbPNO5Z9c8l91d/fcvXJn/vffrdCNxgO8w/VIY/8iYqogII9P//////////ARADGgwyNzgwNTM1MjI1OTMiDMoKVGdStlergctAOCr2AQWEEkMWKICZm2we1rS680MZn7zlkIUxkfnQW99/6H640RUKOxD/G7mF4/j9IJ1b/e/aZTf9kF8Ktd36V4z0g4Rx0t/8OfIhO3LnTlerKk9gwVNaE+gJOML9rbEaZe3fjCCt2c+v9YcMPCnXg+6WWlijvl7des4tCZHScbPOhrakbaNS6cs/n+5xHyf37Wk2Zua8WFlk8ZUZIkDUIkOZ9cr3K+gdjiMmjQBtlsmdMlNdK3/ttitzdXEkn1JI3fhMzpT3Yfokl9gaCDp8TuSnYrXmh/1UjdoAbXPWatTG3bUpCdX2NZZ1RwmWuIGotT42CFtgAfkHODCTkYa4BjqdAQzWMUy9mSo7Q+jOJljrztE6XeGgvH9TaEB8JHSwvv0nvx4yxpnDmoFhRphue84U3LMc3SRekw/azPQZE2+JjFoAqNCC0SNEh5QKZxPFRfYugIiRvaYzX7JcTwnbQebfAwf9mEH6h8hlq7MQCdIGUE9FYLuQUgLqhuwRMUU1Omsg4Rbb85GEfvWB0e82ZSXhNH9ThR48sRGPqkjk5aQ='
    )

@app.route('/generate', methods=['POST'])
def generate_prompt():
    # Get the prompt data from the request
    data = request.get_json()
    prompt_data = data.get('prompt', '')

    if not prompt_data:
        return jsonify({"error": "No prompt provided"}), 400

    # Create the payload for the Bedrock API
    payload = {
        "prompt": f"\n\nHuman:{prompt_data}\n\nAssistant:",
        "max_tokens_to_sample": 2000,
        "temperature": 0.8,
        "top_p": 0.8,
    }

    body = json.dumps(payload)
    model_id = "anthropic.claude-v2:1"
    
    try:
        # Invoke the Bedrock model
        response = bedrock_runtime.invoke_model(
            body=body,
            modelId=model_id,
            accept="application/json",
            contentType="application/json",
        )

        # Read and parse the response
        response_body = json.loads(response.get("body").read())
        response_text = response_body.get("completion", '')

        return jsonify({"response": response_text}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)