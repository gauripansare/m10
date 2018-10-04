gRecordData = {
    Status: "NotStarted",
    AssessmentScore: "4",
    VisitedNumberOfPages: "0",
    LastVisitedPage: "", // UserSelectedOptionId will be used to jump to the unattempted question
    RecordTitle: "How Does Barbara Corcoran Pick Her Investments on Shark Tank?",
    LandingPageURL: "record2_landing.htm",
    QuestionSequence: "Numbers", // this can be used later if different display style is required
    OptionSequence: "LowerAlphabets", // this can be used later if different display style is required
    RandomizeQuestions: true,
    RandomizeOptions: true,
    Questions: [
                    {
                        QuestionId: "1",
                        QuestionText: "You receive an email message from PayPal with a link and instructions requesting you to update your password. What is the best thing to do with this message?",
                        Options: [
                                     {
                                         "OptionId": "1",
                                         "OptionText": "PayPal is a legitimate organization. Follow the instructions given in the email.",
                                         "IsCorrect": false,

                                     },
                                     {
                                         "OptionId": "2",
                                         "OptionText": "Delete the email message.",
                                         "IsCorrect": true,
                                         "score": 2
                                     },
                                     {
                                         "OptionId": "3",
                                         "OptionText": "Reply to the message requesting more information.",
                                         "IsCorrect": false
                                     }

                        ],
                        IsAnswered:false,
                        CorrectFeedback: "​That is right. ​",
                        IncorrectFeedback: "That is not right. No legitimate organization requests account verification via an email. The best thing to do would be to delete the message.​",
                        "UserSelectedOptionId": ""

                    },
                    {
                        QuestionId: "2",
                        QuestionText: "Which of the following characteristics of an email header should cause suspicion?",
                        Options: [
                                     {
                                         "OptionId": "1",
                                         "OptionText": "Multiple recipients",
                                         "IsCorrect": false,

                                     },
                                     {
                                         "OptionId": "2",
                                         "OptionText": "Unknown sender",
                                         "IsCorrect": false

                                     },
                                     {
                                         "OptionId": "3",
                                         "OptionText": "A sense of urgency in the Subject line",
                                         "IsCorrect": true,
                                         score: 2

                                     }

                        ],
                        IsAnswered:false,
                        IncorrectFeedback: "That is not right. A sense of urgency in the Subject line should cause suspicion.",
                        CorrectFeedback: "​That is right.Among other things, a sense of urgency in the Subject line is cause for suspicion.​",
                        "UserSelectedOptionId": ""

                    },
                    {
                        QuestionId: "3",
                        QuestionText: "An email message arrives from someone in your organization whom you know. The message contains no subject line and the body of the email message contains only a web link to an unfamiliar site. What is the best thing to do with this message?",
                        Options: [
                                     {
                                         "OptionId": "1",
                                         "OptionText": "Reply to the sender asking if they sent the message.",
                                         "IsCorrect": false
                                     },
                                     {
                                         "OptionId": "2",
                                         "OptionText": "Because it is from somebody you know, it is okay to click the link.",
                                         "IsCorrect": false
                                     },
                                     {
                                         "OptionId": "3",
                                         "OptionText": "Delete the message without opening it.",
                                         "IsCorrect": true,
                                         score: 2
                                         
                                     }

                        ],
                        IsAnswered:false,
                        IncorrectFeedback: "​That is not right. The best thing to do would be to delete the message without even opening it.​",
                        CorrectFeedback: "​That is right, no subject line and body containing only a link are signs that the email message was sent fraudulently.​",
                        "UserSelectedOptionId": ""

                    },
                    {
                        QuestionId: "4",
                        QuestionText: "You receive an email message from a colleague with an attachment you were not expecting. In the body of the message, he addresses you by name and suggests that the attachment contains specs for your next project, which you should review with your boss, whom he also addresses by name. What is the best thing to do with this email message?",
                        Options: [
                                     {
                                         "OptionId": "1",
                                         "OptionText": "Open it and review the attachment.",
                                         "IsCorrect": true,
                                         score: 2
                                     },
                                     {
                                         "OptionId": "2",
                                         "OptionText": "Attachments are unsafe. Delete the email message without opening it.",
                                         "IsCorrect": false
                                     },
                                     {
                                         "OptionId": "3",
                                         "OptionText": "Respond to the sender asking if they sent the message.",
                                         "IsCorrect": false
                                     }

                        ],
                        IsAnswered:false,
                        IncorrectFeedback: "​​​That is not right. There is nothing suspicious about this message. Because it is from somebody you know who addressed you and your boss by name, it is okay to open it and review the attachment.​",
                        CorrectFeedback: "​​​​That is right. There is nothing suspicious about this message. Because it is from somebody you know who addressed you and your boss by name, it is okay to open it and review the attachment.",
                        "UserSelectedOptionId": ""

                    }

    ]
}