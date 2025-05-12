import { ApiResponse } from '@/types/apiResponse';

// Sample data based on the parserResponse.json format
export const sampleResumeData: ApiResponse = {
  "success": true,
  "data": {
    "personalInfo": {
      "name": {
        "value": "David Lee",
        "confidence": 0.5,
        "standardization": null
      },
      "email": {
        "value": "david-lee@mail.com",
        "confidence": 0.5,
        "standardization": null
      },
      "phone": {
        "value": "",
        "confidence": 0.5,
        "standardization": null
      },
      "location": {
        "value": "",
        "confidence": 0.5,
        "standardization": null
      },
      "linkedin": {
        "value": "",
        "confidence": 0.5,
        "standardization": null
      },
      "github": {
        "value": "",
        "confidence": 0.5,
        "standardization": null
      },
      "website": {
        "value": "",
        "confidence": 0.5,
        "standardization": null
      },
      "summary": {
        "value": "",
        "confidence": 0.5,
        "standardization": null
      }
    },
    "skills": [
      {
        "name": {
          "value": {
            "value": "Computer Skills",
            "confidence": 0.8,
            "standardization": "Standardized to 'Computer Skills'"
          },
          "confidence": 0.5,
          "standardization": null
        },
        "category": {
          "value": {
            "value": "",
            "confidence": 0.2,
            "standardization": "No category provided"
          },
          "confidence": 0.5,
          "standardization": null
        },
        "proficiency": {
          "value": {
            "value": "",
            "confidence": 0.2,
            "standardization": "No proficiency provided"
          },
          "confidence": 0.5,
          "standardization": null
        },
        "yearsOfExperience": {
          "value": 0,
          "confidence": 0.5,
          "standardization": null
        }
      },
      {
        "name": {
          "value": {
            "value": "Programming",
            "confidence": 0.9,
            "standardization": "Validated"
          },
          "confidence": 0.5,
          "standardization": null
        },
        "category": {
          "value": {
            "value": "",
            "confidence": 0.2,
            "standardization": "No category provided"
          },
          "confidence": 0.5,
          "standardization": null
        },
        "proficiency": {
          "value": {
            "value": "",
            "confidence": 0.2,
            "standardization": "No proficiency provided"
          },
          "confidence": 0.5,
          "standardization": null
        },
        "yearsOfExperience": {
          "value": 0,
          "confidence": 0.5,
          "standardization": null
        }
      },
      {
        "name": {
          "value": {
            "value": "Web Design",
            "confidence": 0.9,
            "standardization": "Validated"
          },
          "confidence": 0.5,
          "standardization": null
        },
        "category": {
          "value": {
            "value": "",
            "confidence": 0.2,
            "standardization": "No category provided"
          },
          "confidence": 0.5,
          "standardization": null
        },
        "proficiency": {
          "value": {
            "value": "",
            "confidence": 0.2,
            "standardization": "No proficiency provided"
          },
          "confidence": 0.5,
          "standardization": null
        },
        "yearsOfExperience": {
          "value": 0,
          "confidence": 0.5,
          "standardization": null
        }
      },
      {
        "name": {
          "value": {
            "value": "Excel",
            "confidence": 0.9,
            "standardization": "Validated"
          },
          "confidence": 0.5,
          "standardization": null
        },
        "category": {
          "value": {
            "value": "Software",
            "confidence": 0.7,
            "standardization": "Standardized from 'Tools'"
          },
          "confidence": 0.5,
          "standardization": null
        },
        "proficiency": {
          "value": {
            "value": "",
            "confidence": 0.2,
            "standardization": "No proficiency provided"
          },
          "confidence": 0.5,
          "standardization": null
        },
        "yearsOfExperience": {
          "value": 0,
          "confidence": 0.5,
          "standardization": null
        }
      }
    ],
    "workExperience": [
      {
        "company": {
          "value": "Tech Company",
          "confidence": 0.5,
          "standardization": null
        },
        "title": {
          "value": "Software Developer",
          "confidence": 0.5,
          "standardization": null
        },
        "location": {
          "value": "",
          "confidence": 0.5,
          "standardization": null
        },
        "dates": {
          "startDate": {
            "value": "2020-01",
            "confidence": 0.5,
            "standardization": null
          },
          "endDate": {
            "value": "2023-01",
            "confidence": 0.5,
            "standardization": null
          },
          "durationInMonths": {
            "value": 36,
            "confidence": 0.8,
            "standardization": null
          },
          "current": {
            "value": false,
            "confidence": 0.5,
            "standardization": null
          }
        },
        "responsibilities": {
          "value": [
            "developed websites and fixed bugs",
            "worked in a team"
          ],
          "confidence": 0.5,
          "standardization": null
        },
        "technologies": {
          "value": [],
          "confidence": 0.5,
          "standardization": null
        },
        "achievements": {
          "value": [],
          "confidence": 0.5,
          "standardization": null
        }
      },
      {
        "company": {
          "value": "",
          "confidence": 0.5,
          "standardization": null
        },
        "title": {
          "value": "IT Support Specialist",
          "confidence": 0.5,
          "standardization": null
        },
        "location": {
          "value": "",
          "confidence": 0.5,
          "standardization": null
        },
        "dates": {
          "startDate": {
            "value": "2018-01",
            "confidence": 0.5,
            "standardization": null
          },
          "endDate": {
            "value": "2020-01",
            "confidence": 0.5,
            "standardization": null
          },
          "durationInMonths": {
            "value": 24,
            "confidence": 0.8,
            "standardization": null
          },
          "current": {
            "value": false,
            "confidence": 0.5,
            "standardization": null
          }
        },
        "responsibilities": {
          "value": [
            "helped users with computer problems",
            "installed software"
          ],
          "confidence": 0.5,
          "standardization": null
        },
        "technologies": {
          "value": [],
          "confidence": 0.5,
          "standardization": null
        },
        "achievements": {
          "value": [],
          "confidence": 0.5,
          "standardization": null
        }
      }
    ],
    "education": [
      {
        "institution": {
          "value": "",
          "confidence": 0.5,
          "standardization": null
        },
        "degree": {
          "value": {
            "value": "Bachelor's in Computer Science",
            "confidence": 0.6,
            "standardization": "Standardized from 'computer related degree'"
          },
          "confidence": 0.5,
          "standardization": null
        },
        "field": {
          "value": {
            "value": "Computer Science",
            "confidence": 0.6,
            "standardization": "Standardized to 'Computer Science'"
          },
          "confidence": 0.5,
          "standardization": null
        },
        "dates": {
          "startDate": {
            "value": "",
            "confidence": 0.5,
            "standardization": null
          },
          "endDate": {
            "value": "2018-01",
            "confidence": 0.5,
            "standardization": null
          },
          "durationInMonths": {
            "value": null,
            "confidence": 0.5,
            "standardization": null
          },
          "current": {
            "value": false,
            "confidence": 0.5,
            "standardization": null
          }
        },
        "gpa": {
          "value": "",
          "confidence": 0.5,
          "standardization": null
        },
        "coursework": {
          "value": null,
          "confidence": 0.5,
          "standardization": null
        },
        "achievements": {
          "value": null,
          "confidence": 0.5,
          "standardization": null
        }
      }
    ],
    "projects": [],
    "certifications": [],
    "languages": [],
    "overallConfidence": 0.58,
    "missingFields": [
      "personalInfo.phone"
    ],
    "detectedSections": [
      "skills",
      "work_experience",
      "education"
    ]
  }
};