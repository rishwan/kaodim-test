const questionsList = {
  "title": "This is a title for the form Header",
    "questions": [
    {
      "id": 2447,
      "question_type": "TextQuestion",
      "prompt": "What is your first answer?",
      "is_required": false,
      "min_char_length": 15
    },
    {
      "id": 2448,
      "question_type": "TextQuestion",
      "prompt": "What is your second answer?",
      "is_required": false,
      "min_char_length": 15
    },
    {
      "id": 2500,
      "question_type": "TextQuestion",
      "prompt": "What is your third answer?",
      "is_required": false,
      "min_char_length": 1,
    },
      {
        "id": 2501,
        "question_type": "CheckboxQuestion",
        "prompt": "What is your fourth answer?",
        "is_required": false,
        "choices": [
          {"key": 0, "value": "1", "text": "choice 1"},
          {"key": 1, "value": "2", "text": "choice 2"},
          {"key": 2, "value": "3", "text": "choice 3"},
        ],
      },
      {
        "id": 2502,
        "question_type": "RadioQuestion",
        "prompt": "What is your fifth answer?",
        "is_required": false,
        "choices": [
          {"key": 0, "value": "1", "text": "radio choice 1"},
          {"key": 1, "value": "2", "text": "radio choice 2"},
          {"key": 2, "value": "3", "text": "radio choice 3"},
        ],
      },
      {
        "id": 2503,
        "question_type": "FileUpload",
        "prompt": "Upload a file",
        "is_required": false,
        "allowed_mime_types": "image/jpeg, image/png"
      }
  ]
}

export default questionsList