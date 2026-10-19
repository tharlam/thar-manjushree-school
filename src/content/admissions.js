import { F } from './field.js'

export const fields = {
  heroKicker: F('Admissions & Ordination', 'भर्ना र दीक्षा', 'ཐོ་འགོད་དང་རབ་བྱུང་།'),
  criteriaEyebrow: F('Before You Apply', 'आवेदन दिनु अघि', 'ཞུ་འདེགས་མ་འབུལ་གོང་།'),
  criteriaItem1: F('The applicant must be a male child between the ages of 7 and 14 years old.', 'आवेदक ७ देखि १४ वर्ष उमेरको पुरुष बालक हुनुपर्छ।', 'ཞུ་འདེགས་བྱེད་མཁན་ནི་ ༧ ལས་ ༡༤ གྱི་བར་གྱི་ལོ་ཆུང་བུ་ཞིག་ཡིན་དགོས།'),
  criteriaItem2: F('The child must express an authentic, personal desire to join the monastic community.', 'बालकले मठ समुदायमा सहभागी हुने वास्तविक र व्यक्तिगत इच्छा व्यक्त गरेको हुनुपर्छ।', 'བྱིས་པ་དེས་དགོན་པའི་སྡེ་ཁག་ལ་ཞུགས་འདོད་ཀྱི་སེམས་དངོས་གནས་དང་ལྡན་པར་གསལ་བོ་བརྗོད་དགོས།'),
  criteriaItem3: F(
    'He must pass a basic medical check to ensure he does not have a contagious condition that could affect a residential community.',
    'उनले आधारभूत चिकित्सा परीक्षण पास गरेको हुनुपर्छ, जसले गर्दा उनीमा समुदायलाई असर गर्ने संक्रामक रोग नभएको सुनिश्चित हुन्छ।',
    'དེ་ལ་སྡེ་ཁག་གི་འཚོ་བའི་ལུས་ཁམས་ལ་གནོད་སྐྱེལ་བའི་འགྱུར་ཁམས་མེད་པར་གནད་ཡོད་ཀྱི་ཁྱད་འབྱེད་བྱེད་དགོས།'
  ),
  criteriaItem4: F('Both parents, or his legal guardians, must provide clear written consent.', 'दुबै अभिभावक वा कानुनी अभिभावकहरूले स्पष्ट लिखित सहमति प्रदान गर्नुपर्छ।', 'ཕ་མ་གཉིས་ཡང་ན་ཁྲིམས་མཐུན་གྱི་སྐྱོང་མཁན་གཉིས་ཀྱིས་གསལ་བོའི་ཡི་གེའི་གནང་བ་འབུལ་དགོས།'),
  stepEyebrow: F('Step', 'चरण', 'རིམ་པ།'),
  step1Title: F('The Digital Inquiry', 'डिजिटल जानकारी अनुरोध', 'དྲ་ཐོག་གི་ཞུ་འདེགས།'),
  step1Body: F('Submit the initial application form through our website.', 'हाम्रो वेबसाइट मार्फत प्रारम्भिक आवेदन फारम पेश गर्नुहोस्।', 'ང་ཚོའི་དྲ་ཚིགས་བརྒྱུད་ནས་འགོ་ཐོག་གི་ཞུ་འདེགས་ཕོར་མ་འབུལ་དགོས།'),
  step2Title: F('The Monastic Invitation', 'मठीय निमन्त्रणा', 'དགོན་པའི་སྐུ་མགྲོན་གདན་ཞུ་བ།'),
  step2Body: F('Shortlisted families are invited to stay at the guest house for a 3-day trial evaluation.', 'छानिएका परिवारहरूलाई ३ दिनको परीक्षण मूल्याङ्कनका लागि अतिथिगृहमा बस्न निमन्त्रणा गरिन्छ।', 'ཡང་བསྐྱར་འདེམས་བྱས་པའི་ཁྱིམ་ཚང་རྣམས་ལ་ཉིན་ ༣ ཡི་ཚོད་ལྟའི་ཞིབ་བཤེར་ཀྱི་དོན་དུ་མགྲོན་ཁང་དུ་བསྡད་དགོས་པའི་སྐུ་མགྲོན་གནང་བ་ཡིན།'),
  step3Title: F('The Spiritual & Academic Dialogue', 'आध्यात्मिक र शैक्षिक संवाद', 'ཆོས་དང་སློབ་གཉེར་གྱི་གྲོས་བསྡུར།'),
  step3Body: F('A gentle interview with the Principal to understand the child\u2019s natural inclination and readiness.', 'बालकको स्वाभाविक झुकाव र तयारी बुझ्न प्रधानाचार्यसँग कोमल अन्तरवार्ता गरिन्छ।', 'བྱིས་པ་དེའི་རང་བྱུང་གི་ལམ་ཁ་དང་གྲ་སྒྲིག་ཤེས་རྟོགས་བྱེད་པར་དགེ་འདུན་གྱི་འབྲེལ་བ་ལ་ཡིད་ཆེས་ལྡན་པའི་ཁ་བརྡ་བྱེད་པ་ཡིན།'),
  step4Title: F('The Hair-Cutting & Robe Ceremony', 'केश काट्ने र वस्त्र धारण गर्ने समारोह', 'སྐྲ་སྤུ་བཅད་དང་ཆས་བགོས་པའི་མཛད་སྒོ།'),
  step4Body: F('Upon formal acceptance, the student is assigned to his house and officially enters the novice order.', 'औपचारिक रूपमा स्वीकृत भएपछि, विद्यार्थीलाई आफ्नो घर तोकिन्छ र औपचारिक रूपमा नवसाधकहरूको समूहमा प्रवेश गरिन्छ।', 'ཡིག་ཚགས་ཀྱིས་ངོས་འཛིན་བྱས་རྗེས་སློབ་མ་དེ་ལ་ཁྱིམ་ཚན་ཞིག་བགོ་བ་དང་། གྲྭ་སློབ་གོ་གནས་ཀྱི་ཐོག་ནས་གྲྭ་པའི་གྲངས་ཐོག་ཏུ་སྤྱད་པ་ཡིན།'),
  documentationTitle: F('Documentation Checklist', 'कागजात चेकलिस्ट', 'ཡིག་ཆའི་ཐོ་གཞུང་།'),
  documentsEyebrow: F('Please Prepare', 'कृपया तयार गर्नुहोस्', 'གྲ་སྒྲིག་གནང་རོགས།'),
  documentItem1: F('Certified copy of the official Birth Certificate.', 'जन्म प्रमाणपत्रको प्रमाणित प्रतिलिपि।', 'སྐྱེས་བརྡའི་ཡིག་ཆའི་བདེན་དཔྱད་བྱས་པའི་འདྲ་བཤུས།'),
  documentItem2: F('National Identity Cards or Passports of both parents/guardians.', 'दुबै अभिभावक/संरक्षकहरूको राष्ट्रिय परिचयपत्र वा पासपोर्ट।', 'ཕ་མ་གཉིས་ཡང་ན་སྐྱོང་མཁན་གྱི་རྒྱལ་ཡོངས་མིང་ཐོའི་ཡིག་ཆ་ཡང་ན་པ་སི་པོར་ཊི།'),
  documentItem3: F('Official school transcripts or character certificates from previous schools (if any).', 'पूर्व विद्यालयबाट प्राप्त आधिकारिक शैक्षिक ट्रान्सक्रिप्ट वा चारित्रिक प्रमाणपत्र (यदि छ भने)।', 'སྔོན་གྱི་སློབ་གྲྭས་བྱིན་པའི་སློབ་གཉེར་གྱི་ཡིག་ཆ་ཡང་ན་སྤྱོད་ཚུལ་གྱི་ཡིག་ཆ། (ཡོད་ན་འབུལ་དགོས།)'),
  documentItem4: F('Recent medical check-up clearance report from a certified physician.', 'प्रमाणित चिकित्सकबाट प्राप्त हालसालैको चिकित्सा जाँच प्रमाणपत्र।', 'བདེན་དཔྱད་བྱས་པའི་སྨན་པས་བྱིན་པའི་ཉེ་དུས་ཀྱི་ཁྱད་འབྱེད་ཡིག་ཆ།'),
  faqEyebrow: F('Good to Know', 'जानकारीका लागि राम्रो', 'ཤེས་དགོས་པ།'),
  faqTitle: F('Frequently Asked Questions', 'बारम्बार सोधिने प्रश्नहरू', 'མང་ཤོས་དྲི་བ་ཡིན་པའི་དྲི་བ།'),
  faq1Question: F('Are there hidden fees for books, clothing, or housing?', 'पुस्तक, वस्त्र वा आवासका लागि कुनै लुकेका शुल्कहरू छन्?', 'དཔེ་ཆ། ཆས་སྒྲིགས། གནས་ཚང་སོགས་ཀྱི་དོན་དུ་གཞན་དག་གི་སྒོ་ནས་འགན་འཁུར་ཡོད་དམ།'),
  faq1Answer: F(
    'Absolutely not. Once a child is accepted, his education, meals, clothing, and housing are 100% free. That includes his seasonal robes, textbooks, three meals a day, and his bed in our residential quarters.',
    'एकदम छैन। एकपटक बालकलाई स्वीकृत गरिएपछि, उसको शिक्षा, भोजन, वस्त्र र आवास १००% निःशुल्क हुन्छ। यसमा उसको मौसमी वस्त्र, पाठ्यपुस्तकहरू, दिनको तीनवटा भोजन र आवासीय क्वार्टरमा उसको ओछ्यान समावेश छ।',
    'དེ་ལྟར་མེད། བྱིས་པ་ཞིག་ངོས་འཛིན་བྱས་རྗེས་སློབ་སྦྱོང་། ཟས། ཆས་སྒྲིགས། གནས་ཚང་ཡོངས་རྫོགས་རང་བཞིན་གྱིས་མི་སྤྲོད་ཅིང་འགོག་གནང་གི་ཡོད། དེར་དུས་སྐབས་ཀྱི་ཆས་སྒྲིགས། དཔེ་ཆ། ཉིན་རེར་ཟས་གསུམ། གནས་ཚང་ནང་གི་ཉལ་ཁྲི་སོགས་ཚུད་ཡོད།'
  ),
  faq2Question: F('Can a student leave the monastery if he realizes the path is not right for him?', 'यदि विद्यार्थीले यो मार्ग आफ्नाका लागि उपयुक्त छैन भने मठ छोड्न सक्छ?', 'སློབ་མ་ཞིག་གིས་ལམ་གྱིས་ཁོ་ཚོའི་འཚོ་བ་ལ་མི་འཚམ་པ་ཤེས་རྗེས་དགོན་པ་ལས་འབུད་ཆོག་གམ།'),
  faq2Answer: F(
    'Yes. Monastic life is entirely voluntary. If a student decides later in life to pursue a secular career, he leaves with the education he has received.',
    'हो। मठ जीवन पूर्ण रूपमा स्वैच्छिक हो। यदि कुनै विद्यार्थी पछि सांसारिक जीवनमा जाने निर्णय गर्छ भने, उसले प्राप्त गरेको शिक्षासहित मठ छोड्छ।',
    'ཡིན། གྲྭ་བའི་འཚོ་བ་ནི་རང་མོས་ཀྱི་རྐྱེན་གྱིས་ཡིན། སློབ་མ་ཞིག་གིས་འཕྲོས་ནས་སྤྱིའི་འཚོ་བའི་ལམ་ལ་ཞུགས་འདོད་བྱུང་ཚེ་ཁོས་དེས་ཐོབ་པའི་སློབ་གཉེར་བཅས་དགོན་པ་ལས་འབུད་ཆོག'
  ),
  classOption1: F('Level 1', 'स्तर १', 'རིམ་པ་ ༡'),
  classOption2: F('Level 2', 'स्तर २', 'རིམ་པ་ ༢'),
  classOption3: F('Level 3', 'स्तर ३', 'རིམ་པ་ ༣'),
  classOption4: F('Level 4', 'स्तर ४', 'རིམ་པ་ ༤'),
  classOption5: F('Level 5', 'स्तर ५', 'རིམ་པ་ ༥'),
  classOption6: F('Level 6', 'स्तर ६', 'རིམ་པ་ ༦'),
  classOption7: F('Level 7', 'स्तर ७', 'རིམ་པ་ ༧'),
  formTitle: F('Online Application Form', 'अनलाइन आवेदन फारम', 'དྲ་ཐོག་གི་ཞུ་འདེགས་ཕོར་མ།'),
  formFullName: F('Full Name of Applicant', 'आवेदकको पूरा नाम', 'ཞུ་འདེགས་བྱེད་མཁན་གྱི་མིང་ཆ་ཚང་།'),
  formGuardianName: F('Guardian / Parent Name', 'अभिभावक / अभिभावकको नाम', 'ཕ་མ་ཡང་ན་སྐྱོང་མཁན་གྱི་མིང་།'),
  formDateOfBirth: F('Date of Birth', 'जन्म मिति', 'སྐྱེས་སྐར།'),
  formAge: F('Age', 'उमेर', 'ལོ་ཚད།'),
  formPhone: F('Contact Phone', 'सम्पर्क फोन', 'འབྲེལ་གཏུགས་ཁ་པར།'),
  formAddress: F('Home Address', 'घरको ठेगाना', 'ཁྱིམ་ངོས་ཀྱི་ས་གནས།'),
  formEducation: F('Previous Education (optional)', 'पूर्व शिक्षा (वैकल्पिक)', 'སྔོན་གྱི་སློབ་གཉེར་གྱི་གནས་ཚུལ། (འདོད་ཆོག)'),
  formClassRequested: F('Requested Class', 'मागिएको कक्षा', 'ཞུ་འདེགས་བྱས་པའི་སློབ་རིམ།'),
  formMessage: F('Message to the Admissions Council', 'भर्ना परिषद्लाई सन्देश', 'ཐོ་འགོད་ཚོགས་པར་འབུལ་བའི་བརྡ་འཕྲིན།'),
  formSubmit: F('Submit Application', 'आवेदन पेश गर्नुहोस्', 'ཞུ་འདེགས་ཕུལ་བ།'),
  formSuccessMessage: F(
    'Thank you! Your application has been received and will be reviewed shortly.',
    'धन्यवाद! तपाईंको आवेदन प्राप्त भयो र चाँडै समीक्षा गरिनेछ।',
    'ཐུགས་རྗེ་ཆེ་ལགས། ཁྱེད་ཀྱི་ཞུ་འདེགས་འབུལ་བ་ལེགས་འགྲུབ་བྱུང་ཡོད་ཅིང་མྱུར་དུ་ཞིབ་བཤེར་བྱེད་རྒྱུ་ཡིན།'
  ),
  formInvalidMessage: F(
    'Please fill in all required fields.',
    'कृपया सबै आवश्यक फिल्डहरू भर्नुहोस्।',
    'དགོས་ངེས་ཀྱི་ནང་དོན་ཡོངས་རྫོགས་འབུལ་རོགས་གནང་།'
  ),
  formPreviewNote: F(
    'Submissions appear instantly in the Admin Monks Roster as "Pending Review".',
    'पेश गरिएका आवेदनहरू प्रशासन भिक्षु सूचीमा "समीक्षा पर्खाइमा" को रूपमा तुरुन्तै देखिन्छन्।',
    'འབུལ་བའི་ཞུ་འདེགས་རྣམས་ནི་དོ་དམ་གྱི་གྲྭ་བའི་ཐོ་གཞུང་ནང་དུ་ "ཞིབ་བཤེར་སྒུག་བཞིན་པ་" ཞེས་མྱུར་དུ་ཤར་ཡོང་།'
  ),
  submittingLabel: F('Submitting...', 'पेश गर्दै...', 'འབུལ་བཞིན་པ།'),
}
