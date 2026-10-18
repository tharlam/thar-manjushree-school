const F = (en, ne, bo) => ({ en, ne, bo })

export const pageFields = {
  home: ['heroTitle', 'heroSubtitle', 'welcomeTitle', 'welcomeBody', 'ctaSupport', 'ctaAdmissions'],
  tradition: ['introTitle', 'introBody', 'historyTitle', 'historyBody', 'philosophyTitle', 'philosophyBody'],
  founder: ['name', 'title', 'bioTitle', 'bioBody', 'visionTitle', 'visionBody'],
  lineage: ['introTitle', 'introBody', 'mastersTitle', 'mastersBody'],
  curriculum: ['introTitle', 'introBody', 'philosophyTitle', 'philosophyBody', 'modernTitle', 'modernBody'],
  schedule: ['introTitle', 'introBody'],
  admissions: ['introTitle', 'introBody', 'requirementsTitle', 'requirementsBody', 'processTitle', 'processBody'],
  gallery: ['introTitle', 'introBody'],
  donations: ['introTitle', 'introBody', 'bankTitle', 'bankBody', 'transparencyTitle', 'transparencyBody'],
  contact: ['introTitle', 'introBody'],
}

export const contentDefaults = {
  pages: {
    home: {
      heroTitle: F(
        'Where Ancient Wisdom Awakens Modern Minds',
        'बौद्ध शिक्षाको जीवन्त परम्परा संरक्षण गर्दै',
        'ནང་བསྟན་སློབ་གཉེར་གྱི་གཞོན་ནུའི་སྲོལ་རྒྱུན་སྲུང་སྐྱོབ་བྱེད་བཞིན་པ།'
      ),
      heroSubtitle: F(
        'Bridging centuries of sacred Sakya monastic tradition with modern schooling, in a serene sanctuary in the heart of Boudha, Kathmandu. Completely free for every young monk in our care.',
        'थार मन्जुश्री विद्यालयले नेपालको मुटुमा रहेर शास्त्रीय बौद्ध दर्शन र आधुनिक शैक्षिक विषयहरू सिकाएर युवा भिक्षुहरूको पोषण गर्छ।',
        'ཐར་དམན་ཛུ་ཤྲི་སློབ་གྲྭས་བལ་ཡུལ་གྱི་སྙིང་པོར་གཞུང་ལུགས་ཀྱི་ནང་བསྟན་མཚན་ཉིད་དང་དེང་རབས་སློབ་གཉེར་གཉིས་ཀ་སློབ་སྦྱོང་བྱས་ཏེ་གྲྭ་བ་གཞོན་ནུ་རྣམས་འཚར་ལོངས་སུ་གཏོང་བཞིན་ཡོད།'
      ),
      welcomeTitle: F(
        'Welcome to the School & Monastery',
        'थार मन्जुश्री विद्यालयमा स्वागत छ',
        'ཐར་དམན་ཛུ་ཤྲི་སློབ་གྲྭར་དགའ་བསུ་ཞུ་བཞིན་ཡོད།'
      ),
      welcomeBody: F(
        'Beside the great Boudhanath Stupa in Kathmandu, Tharlam Manjushree School stands as a living sanctuary for spiritual preservation and intellectual growth. We are part of Tharlam Monastery, and we believe that true education should not only inform the mind but also transform the heart.\n\nOur curriculum brings two great traditions of learning together under one roof. Here, young monks receive traditional monastic training, ethics, and scriptural study, and at the same time learn English, Tibetan, Mathematics, and General Science in a modern classroom. Every child is given his education, his meals, his clothing, and a home within the monastery, entirely free of charge. We are not just educating students; we are nurturing kind-hearted, capable young people who carry both the wisdom of their heritage and the skills to meet the modern world.',
        'आधा शताब्दीभन्दा बढी समयदेखि हाम्रो मठ युवा केटाहरूका लागि अध्ययन, ध्यान र सेवामा जीवन समर्पण गर्न चाहनेहरूको घर रहँदै आएको छ। प्रत्येक भिक्षुले बाल्यकालमा तिब्बती वर्णमाला सिक्नेदेखि नालन्दा परम्पराका महान दार्शनिक ग्रन्थहरूमा निपुण हुनेसम्मको पूर्ण यात्रा तय गर्छ, साथै अंग्रेजी, गणित, विज्ञान र कम्प्युटरमा आधुनिक शिक्षा पनि प्राप्त गर्छ।',
        'ལོ་ངོ་ཕྱེད་ཀ་ལས་ལྷག་རིང་ནས་ང་ཚོའི་དགོན་སྡེ་འདི་སློབ་སྦྱོང་། བསྒོམ་སྒྲུབ། ཞབས་ཞུ་བཅས་ཀྱི་ཆེད་དུ་འཚོ་བ་སྒྲུབ་འདོད་པའི་གྲྭ་བ་གཞོན་ནུ་ཚོའི་ཁྱིམ་ཞིག་ཡིན། གྲྭ་བ་རེ་རེས་ཆུང་དུས་བོད་ཡིག་གི་ཀ་ཁ་སློབ་པ་ནས་ཎཱ་ལནྡ་གྱི་སྲོལ་རྒྱུན་མཚན་ཉིད་ཀྱི་གཞུང་ཆེན་པོ་རྣམས་ལ་མཁས་པར་གྱུར་པའི་བར་གྱི་ལམ་ཡོངས་རྫོགས་བགྲོད་པ་དང་། དེ་དང་ཆབས་ཅིག་དབྱིན་ཡིག་དང་། རྩིས་རིག། ཚན་རིག། གློག་ཀླད་བཅས་ཀྱི་དེང་རབས་སློབ་གཉེར་ཡང་ཐོབ་བཞིན་ཡོད།'
      ),
      ctaSupport: F('Support Our Mission', 'हामीलाई सहयोग गर्नुहोस्', 'རྒྱབ་སྐྱོར་གནང་རོགས།'),
      ctaAdmissions: F('Apply for Enrollment', 'भर्ना', 'ཐོ་འགོད།'),
    },
    tradition: {
      introTitle: F('Our Monastic Tradition', 'हाम्रो मठ परम्परा', 'ང་ཚོའི་དགོན་སྡེའི་སྲོལ་རྒྱུན།'),
      introBody: F(
        'Thar Manjushree belongs to the Mahayana Buddhist tradition, following the Nalanda lineage of monastic scholarship that flourished across India and Tibet. We follow the Vinaya code of discipline and the scholastic curriculum of the great Indian and Tibetan masters.',
        'थार मन्जुश्री महायान बौद्ध परम्पराको सदस्य हो, जुन भारत र तिब्बतभरि फस्टाएको नालन्दा मठ विद्वत्ता परम्पराको अनुशरण गर्छ। हामी विनय अनुशासन संहिता र महान भारतीय तथा तिब्बती गुरुहरूको विद्वत्तापूर्ण पाठ्यक्रमको पालना गर्छौं।',
        'ཐར་དམན་ཛུ་ཤྲི་ནི་མ་ཧཱ་ཡཱ་ན་ནང་བསྟན་གྱི་སྲོལ་རྒྱུན་ཡིན་ལ། རྒྱ་གར་དང་བོད་ཡོངས་སུ་དར་བའི་ཎཱ་ལནྡའི་མཚན་ཉིད་ཀྱི་སྲོལ་རྒྱུན་ལ་རྒྱུན་འཛིན་བྱེད་བཞིན་ཡོད། ང་ཚོས་འདུལ་བའི་བཅའ་ཁྲིམས་དང་། རྒྱ་གར་དང་བོད་ཀྱི་མཁས་པ་ཆེན་པོ་རྣམས་ཀྱི་མཚན་ཉིད་སློབ་གཉེར་གྱི་གཞུང་ཆེན་པོ་རྣམས་ལ་རྒྱུན་འཛིན་བྱེད་བཞིན་ཡོད།'
      ),
      historyTitle: F('A Living History', 'जीवन्त इतिहास', 'གཞོན་ནུའི་ལོ་རྒྱུས།'),
      historyBody: F(
        'Founded in 1964, the school began with a handful of students studying in a single prayer hall. Today our campus houses monks from across the Himalayan region who continue the same discipline of study, debate and practice that their forebears kept for generations.',
        'सन् १९६४ मा स्थापित यो विद्यालय एउटै प्रार्थना कक्षमा थोरै विद्यार्थीसहित सुरु भएको थियो। आज हाम्रो क्याम्पसमा हिमाली क्षेत्रभरका भिक्षुहरू रहेका छन्, जसले आफ्ना पुर्खाहरूले पुस्तौंदेखि राखेको अध्ययन, बहस र अभ्यासको अनुशासनलाई निरन्तरता दिइरहेका छन्।',
        'སྤྱི་ལོ་༡༩༦༤ ལོར་བཙུགས་པའི་སློབ་གྲྭ་འདི་ཐོག་མར་མཆོད་ཁང་གཅིག་ཏུ་སློབ་མ་ཉུང་ཤས་ཤིག་དང་བཅས་ཐོག་བརྩམས་པ་ཡིན། དེ་རིང་ང་ཚོའི་གླིང་འཁོར་དུ་ཧི་མ་ལ་ཡའི་ས་ཁུལ་ཡོངས་ནས་ཕེབས་པའི་གྲྭ་བ་ཚོས་ཕ་མེས་གོང་མ་རྣམས་ཀྱིས་མི་རབས་མང་པོར་བཟུང་བའི་སློབ་སྦྱོང་། རྩོད་འཐབ། སྒྲུབ་པ་བཅས་ཀྱི་བཀའ་དྲིན་ལ་རྒྱུན་འཛིན་བྱེད་བཞིན་ཡོད།'
      ),
      philosophyTitle: F('Spiritual Philosophy', 'आध्यात्मिक दर्शन', 'ཆོས་ཀྱི་ལྟ་བ།'),
      philosophyBody: F(
        'Our approach is grounded in the three trainings of discipline, meditation and wisdom. We believe education must shape not only the mind but also the heart — producing monks who are scholars, meditators and compassionate members of society.',
        'हाम्रो दृष्टिकोण शील, समाधि र प्रज्ञा यी तीन शिक्षामा आधारित छ। शिक्षाले मात्र मन नभई हृदय पनि ढाल्नुपर्छ भन्ने हाम्रो विश्वास छ — विद्वान्, ध्यानी र समाजका करुणावान् सदस्य बन्ने भिक्षुहरू उत्पादन गर्ने।',
        'ང་ཚོའི་ཐབས་ལམ་ནི་ཚུལ་ཁྲིམས། ཏིང་ངེ་འཛིན། ཤེས་རབ་བཅས་ཀྱི་བསླབ་པ་གསུམ་ལ་བརྟེན་ནས་ཡིན། སློབ་གཉེར་གྱིས་སེམས་པ་ཁོ་ན་མིན་པར་སྙིང་པོ་ཡང་རྣམ་པར་སྦྱོང་དགོས་པར་ང་ཚོས་འདོད། དེས་མཁས་པ་དང་། སྒོམ་ཆེན་པ་དང་། སྤྱི་ཚོགས་ཀྱི་བྱམས་སྙིང་ཅན་གྱི་སྤྱོད་མིན་གྱི་གྲྭ་བ་འཛད་པར་བྱེད་པ་ཡིན།'
      ),
    },
    founder: {
      name: F('Kyabje Tharlam Rinpoche', 'क्याब्जे थारलाम रिन्पोछे', 'སྐྱབས་རྗེ་ཐར་ལམ་རིན་པོ་ཆེ།'),
      title: F('Founder & Spiritual Guide', 'संस्थापक तथा आध्यात्मिक मार्गदर्शक', 'སློབ་གྲྭའི་འཛུགས་སྐྲུན་པ་དང་བླ་མ།'),
      bioTitle: F('Biography', 'जीवनी', 'རྣམ་ཐར།'),
      bioBody: F(
        'Kyabje Tharlam Rinpoche was born in 1928 in the Kham region of Tibet. Recognized at a young age, he received complete training in sutra and tantra under the greatest masters of his time. After many years of study and retreat, he came to Nepal in the early 1960s to serve the growing Tibetan refugee community.',
        'क्याब्जे थारलाम रिन्पोछेको जन्म सन् १९२८ मा तिब्बतको खाम क्षेत्रमा भएको थियो। सानै उमेरमा चिनिएका उनले आफ्नो समयका महान गुरुहरूबाट सूत्र र तन्त्रको पूर्ण तालिम प्राप्त गरे। वर्षौंको अध्ययन र आश्रमपछि उनी सन् १९६० को दशकको सुरुमा बढ्दो तिब्बती शरणार्थी समुदायको सेवा गर्न नेपाल आए।',
        'སྐྱབས་རྗེ་ཐར་ལམ་རིན་པོ་ཆེ་ནི་སྤྱི་ལོ་༡༩༢༨ ལོར་བོད་ཀྱི་ཁམས་ས་ཁུལ་དུ་འཁྲུངས་པ་ཡིན། ཆུང་དུས་ཡིན་པར་ངོས་འཛིན་ཐོབ་པ་དེས་རང་གི་དུས་ཀྱི་བླ་མ་ཆེན་པོ་རྣམས་ལས་མདོ་སྔགས་ཀྱི་བསླབ་བྱ་ཡོངས་རྫོགས་ཐོབ་ཅིང་། ལོ་མང་པོའི་སློབ་སྦྱོང་དང་མཚམས་སྦྱོང་གི་རྗེས་སུ་སྤྱི་ལོ་༡༩༦༠ ལོའི་ཐོག་མར་འཕེལ་རྒྱས་འགྲོ་བཞིན་པའི་བོད་སྐྱོར་སྡེ་ཚོགས་ཀྱི་ཞབས་ཞུ་ཆེད་བལ་ཡུལ་དུ་ཕེབས།'
      ),
      visionTitle: F('Vision', 'दृष्टिकोण', 'དགོངས་པ།'),
      visionBody: F(
        'Rinpoche envisioned a school where the wisdom of the Buddha could be preserved in its purest form while young monks were equally prepared for the modern world. His vision of education — grounded in compassion and rigorous scholarship — continues to guide every decision we make today.',
        'रिन्पोछेले बुद्धको ज्ञान शुद्धतम रूपमा संरक्षण गर्न सकिने, साथै युवा भिक्षुहरूलाई आधुनिक संसारका लागि पनि तयार पार्न सकिने विद्यालयको परिकल्पना गरेका थिए। करुणा र कठोर विद्वत्तामा आधारित उनको शिक्षा-दर्शन आज पनि हाम्रो हरेक निर्णयको मार्गदर्शन गर्छ।',
        'རིན་པོ་ཆེས་སངས་རྒྱས་ཀྱི་གདམ་ངག་སྟོང་ཆེན་སྤྱོད་པར་བཟུང་བཞིན་དུ་གྲྭ་བ་གཞོན་ནུ་རྣམས་དེང་རབས་འཇིག་རྟེན་ལའང་གྲ་སྒྲིག་བྱེད་ཐུབ་པའི་སློབ་གྲྭ་ཞིག་གི་དགོངས་པ་བཏང་ཡོད། བྱམས་སྙིང་དང་མཁས་ཐོན་གྱི་སློབ་གཉེར་ལ་བརྟེན་པའི་དེའི་དགོངས་པ་དེ་ད་དུང་ང་ཚོའི་ཐག་གཅོད་ཚང་མར་ལམ་སྟོན་བྱེད་བཞིན་ཡོད།'
      ),
    },
    lineage: {
      introTitle: F('Lineage & Masters', 'गुरु परम्परा र मास्टरहरू', 'བརྒྱུད་པ་དང་དགེ་རྒན་རྣམས།'),
      introBody: F(
        'Our spiritual lineage stretches back to the Buddha himself, passing through the great masters of Nalanda University and the Kagyu and Gelug traditions of Tibet. This unbroken chain of teacher-to-student transmission is the heart of our monastery.',
        'हाम्रो आध्यात्मिक परम्परा स्वयं बुद्धसम्म पुग्छ, जुन नालन्दा विश्वविद्यालयका महान गुरुहरू र तिब्बतका काग्यु तथा गेलुग परम्पराहरू हुँदै आएको छ। गुरु-शिष्य सम्बन्धको यो अखण्ड श्रृंखला हाम्रो मठको मुटु हो।',
        'ང་ཚོའི་ཆོས་བརྒྱུད་ནི་སངས་རྒྱས་ཉིད་ནས་བཙུགས་ཏེ་ཎཱ་ལནྡའི་སློབ་གྲྭ་ཆེན་མོའི་མཁས་པ་ཆེན་པོ་རྣམས་དང་། བོད་ཀྱི་བཀའ་བརྒྱུད་དང་དགེ་ལུགས་ཀྱི་སྲོལ་རྒྱུན་རྣམས་བརྒྱུད་ནས་ཡོད། བླ་མ་ནས་སློབ་མར་བསྒྲགས་པའི་བརྒྱུད་རིམ་མ་ཆད་པ་འདི་ནི་ང་ཚོའི་དགོན་སྡེའི་སྙིང་པོ་ཡིན།'
      ),
      mastersTitle: F('Guiding Masters', 'मार्गदर्शक गुरुहरू', 'ལམ་སྟོན་མཁས་པ་རྣམས།'),
      mastersBody: F(
        'Today a council of senior lamas and geshes — holders of the highest degree in Buddhist philosophy — guide the studies of every monk. Each class is taught by teachers who have themselves completed decades of training in the monasteries of Tibet, Nepal and India.',
        'आज वरिष्ठ लामाहरू र बौद्ध दर्शनको उच्चतम उपाधि गेशे धारण गर्नेहरूको परिषद्ले प्रत्येक भिक्षुको अध्ययनको मार्गदर्शन गर्छ। प्रत्येक कक्षा तिब्बत, नेपाल र भारतका मठहरूमा दशकौंको तालिम पूरा गरेका शिक्षकहरूद्वारा पढाइन्छ।',
        'ད་ལྟ་བླ་མ་རྒན་རབས་དང་། ནང་བསྟན་མཚན་ཉིད་ཀྱི་གོ་རིམ་མཐོ་ཤོས་ཐོགས་པའི་དགེ་བཤེས་ཚོགས་པ་ཞིག་གིས་གྲྭ་བ་རེ་རེའི་སློབ་གཉེར་ལ་ལམ་སྟོན་བྱེད་བཞིན་ཡོད། གྲུབ་རིམ་རེ་རེ་བོད་དང་། བལ་ཡུལ། རྒྱ་གར་བཅས་ཀྱི་དགོན་སྡེ་རྣམས་སུ་ལོ་བཅུ་ཕྲག་མང་པོའི་བསླབ་སྦྱོང་མཇུག་ཡོངས་སུ་བསྐྱངས་པའི་དགེ་རྒན་ཚོས་ཁྲིད་བཞིན་ཡོད།'
      ),
    },
    curriculum: {
      introTitle: F('The Dual Curriculum', 'दोहोरो पाठ्यक्रम', 'སློབ་གཉེར་གཉིས་ལྡན་གྱི་གཞུང།'),
      introBody: F(
        'Our monks receive a truly dual education: the traditional scholastic program of Buddhist philosophy — logic, debate, vinaya, abhidharma and madhyamaka — together with a complete modern curriculum in English, mathematics, science and computer studies.',
        'हाम्रा भिक्षुहरूले साँच्चै दोहोरो शिक्षा प्राप्त गर्छन्: बौद्ध दर्शनको परम्परागत विद्वत्तापूर्ण कार्यक्रम — तर्क, बहस, विनय, अभिधर्म र माध्यमिक — साथै अंग्रेजी, गणित, विज्ञान र कम्प्युटर अध्ययनमा पूर्ण आधुनिक पाठ्यक्रम।',
        'ང་ཚོའི་གྲྭ་བ་ཚོས་སློབ་གཉེར་གཉིས་ལྡན་ཐོག་མེད་པར་ཐོབ་བཞིན་ཡོད། ནང་བསྟན་མཚན་ཉིད་ཀྱི་སྲོལ་རྒྱུན་སློབ་གཉེར་སྟེ་གཏན་ཚིགས་དང་། རྩོད་འཐབ། འདུལ་བ། མངོན་པ། དབུ་མ་བཅས་དང་། དེ་དང་ཆབས་ཅིག་དབྱིན་ཡིག་དང་། རྩིས་རིག། ཚན་རིག། གློག་ཀླད་བཅས་ཀྱི་དེང་རབས་སློབ་གཉེར་ཡོངས་རྫོགས་ཡོད།'
      ),
      philosophyTitle: F('Buddhist Philosophy', 'बौद्ध दर्शन', 'ནང་བསྟན་མཚན་ཉིད།'),
      philosophyBody: F(
        'Beginning with the alphabet and reading, students progress through grammar, poetry, logic and the five great treatises of the Nalanda curriculum. Daily debate practice sharpens their reasoning and deepens their understanding of emptiness, mind and reality.',
        'वर्णमाला र पढाइबाट सुरु गरेर विद्यार्थीहरू व्याकरण, काव्य, तर्क र नालन्दा पाठ्यक्रमका पाँच महान् ग्रन्थहरूसम्म अगाडि बढ्छन्। दैनिक बहस अभ्यासले उनीहरूको तर्कशक्तिलाई तिखार्छ र शून्यता, मन र वास्तविकताको बुझाइलाई गहिरो बनाउँछ।',
        'ཀ་ཁ་དང་ཀློག་སྦྱོང་ནས་ཐོག་བཙུགས་ཏེ་སློབ་མ་ཚོས་བརྡ་སྤྲོད་དང་། སྙན་ངག། གཏན་ཚིགས། ཎཱ་ལནྡའི་སློབ་གཉེར་གྱི་གཞུང་ཆེན་ལྔ་བཅས་བརྒྱུད་ནས་འགྲོ་བཞིན་ཡོད། རྒྱུན་ལྡན་གྱི་རྩོད་འཐབ་སྦྱོང་བརྡར་གྱིས་རྒྱུད་འཛིན་གྱི་ཤེས་རབ་ཤར་བཞིན་དུ་སྟོང་པ་ཉིད་དང་། སེམས། དངོས་པོ་བཅས་ཀྱི་གོ་བ་དེ་བས་གཏིང་ཟབ་ཏུ་འགྲོ་བཞིན་ཡོད།'
      ),
      modernTitle: F('Modern Academics', 'आधुनिक शैक्षिक विषयहरू', 'དེང་རབས་སློབ་གཉེར།'),
      modernBody: F(
        'In the afternoon, monks study the same subjects found in any excellent school: English language and literature, mathematics, science and computer skills. Certified teachers deliver the national curriculum, so our graduates can continue their studies at universities anywhere in the world.',
        'दिउँसो भिक्षुहरूले कुनै पनि उत्कृष्ट विद्यालयमा पाइने विषयहरू नै पढ्छन्: अंग्रेजी भाषा र साहित्य, गणित, विज्ञान र कम्प्युटर सिप। प्रमाणित शिक्षकहरूले राष्ट्रिय पाठ्यक्रम पढाउँछन्, त्यसैले हाम्रा स्नातकहरू विश्वका कुनै पनि विश्वविद्यालयमा आफ्नो अध्ययन जारी राख्न सक्छन्।',
        'ཕྱི་དྲོ་གྲྭ་བ་ཚོས་སློབ་གྲྭ་ཡག་པོ་གང་གི་ནང་དུ་ཡང་མཐོང་སྲིད་པའི་བསླབ་ཆ་ཁག་སྟེ་དབྱིན་ཡིག་དང་རྩོམ་རིག། རྩིས་རིག། ཚན་རིག། གློག་ཀླད་ཀྱི་རྩལ་སྦྱོང་བཅས་སློབ་ཀྱིན་ཡོད། ལས་གནས་ཀྱི་དགེ་རྒན་ཚོས་རྒྱལ་ཁབ་ཀྱི་སློབ་གཉེར་གཞུང་ལ་ཁྲིད་པས་ང་ཚོའི་སློབ་འབྲས་ཚོས་འཛམ་གླིང་གང་གི་སློབ་གྲྭ་ཆེན་མོར་ཡང་རང་གི་སློབ་གཉེར་རྒྱུན་སྐྱོང་བྱེད་ཐུབ་བཞིན་ཡོད།'
      ),
    },
    schedule: {
      introTitle: F('A Day in the Life of a Monk', 'भिक्षुको दैनिक जीवन', 'གྲྭ་བ་ཞིག་གི་ཉིན་རེའི་འཚོ་བ།'),
      introBody: F(
        'Each day begins before sunrise with prayer and meditation, flows through philosophy classes, debates and modern subjects, and closes with evening puja and study. Balance is the key: the day is structured so that body, mind and spirit are all cared for.',
        'प्रत्येक दिन सूर्योदयअघि प्रार्थना र ध्यानबाट सुरु हुन्छ, दर्शन कक्षा, बहस र आधुनिक विषयहरू हुँदै अघि बढ्छ, र साँझको पूजा र अध्ययनबाट समाप्त हुन्छ। सन्तुलन नै मुख्य हो: दिन यसरी संरचित छ कि शरीर, मन र आत्मा तीनैको ख्याल हुन्छ।',
        'ཉིན་རེ་ནི་ཉི་མ་མ་ཤར་གོང་དུ་མཆོད་པ་དང་བསྒོམ་སྒྲུབ་ནས་ཐོག་བཙུགས་ཏེ། མཚན་ཉིད་ཀྱི་སློབ་ཚན་དང་། རྩོད་འཐབ། དེང་རབས་བསླབ་ཆ་རྣམས་བརྒྱུད་ནས་དགོང་མོའི་མཆོད་པ་དང་སློབ་སྦྱོང་གིས་རྫོགས་ཀྱིན་ཡོད། ཆ་སྙོམས་ནི་གཙོ་བོ་ཡིན། ཉིན་གཉིས་ཀྱི་དུས་ཚོད་ལུས་དང་། སེམས་དང་། སྙིང་སྟོབས་གསུམ་ཀར་བརྩི་སྲུང་ཐོབ་པའི་ཐབས་ལ་བཀོད་ཡོད།'
      ),
    },
    admissions: {
      introTitle: F('Admission', 'भर्ना र दीक्षा', 'ཐོ་འགོད་དང་རབ་བྱུང་།'),
      introBody: F(
        'We welcome boys aged 7\u201314 who genuinely wish to join our monastic community. Once accepted, a child\u2019s education, meals, clothing and housing are completely free of charge.',
        'थार मन्जुश्री विद्यालय मठ समुदायमा सामेल हुन चाहने ७ देखि १४ वर्ष उमेरका केटाहरूलाई स्वागत गर्छ। हामी परिवारलाई कुनै खर्च बिना खाना, आश्रय, लुगा, शिक्षा र स्वास्थ्य सेवा प्रदान गर्छौं, जुन पूर्ण रूपमा हाम्रा समर्थकहरूको उदारताबाट टिकेको छ।',
        'ཐར་དམན་ཛུ་ཤྲི་སློབ་གྲྭས་མཚམས་སྡེའི་སྡེ་ཚོགས་སུ་ཞུགས་འདོད་པའི་ལོ་༧ ནས་༡༤ བར་གྱི་བུ་གཞོན་རྣམས་ལ་དགའ་བསུ་ཞུ་བཞིན་ཡོད། ང་ཚོས་ཁྱིམ་ཚང་ལ་གྲོན་གང་ཡང་མེད་པར་ཟས་དང་། བསྡབས་གོས། བཞུགས་ས། སློབ་གཉེར་དང་སྨན་བཅོས་སྤྲོད་ཅིང་། དེ་ཡོངས་རྫོགས་ང་ཚོའི་རྒྱབ་སྐྱོར་པ་རྣམས་ཀྱི་སྙིང་རྗེའི་སྒོ་ནས་གནས་བཞིན་ཡོད།'
      ),
      requirementsTitle: F('Criteria for Entry', 'योग्यता र आवश्यकताहरू', 'ཐོ་འགོད་ཀྱི་ཆ་རྐྱེན།'),
      requirementsBody: F(
        'The applicant must be a male child between the ages of 7 and 14, must express an authentic, personal desire to join the monastic community, must pass a basic medical check, and both parents or legal guardians must provide clear written consent.',
        'आवेदकहरू ७–१४ वर्ष उमेरका, स्वस्थ र मठको अनुशासन पालना गर्न तयार केटाहरू हुनुपर्छ। पूर्व शिक्षा आवश्यक छैन। अभिभावक वा परिवारको सदस्यले सहमति दिनुपर्छ र बालबालिकाको प्रगतिको जानकारी लिन सक्ने गरी सम्पर्क विवरण साझा गर्नुपर्छ।',
        'ཞུ་འདེགས་བྱེད་མཁན་ནི་ལོ་༧–༡༤ བར་གྱི་བུ་གཞོན་ཤེས་ལྡན་ཅིང་དགོན་སྡེའི་བཅའ་ཁྲིམས་ལ་རྒྱུན་འཛིན་བྱེད་འདོད་པ་ཡིན་དགོས། སྔོན་གྱི་སློབ་གཉེར་དགོས་མིན་མེད། སྐྱོང་མཁན་ནམ་ཁྱིམ་མི་ཞིག་གིས་གནང་བརྡ་བྱེད་དགོས་པ་དང་། བུ་ཆུང་གི་འཕེལ་རིམ་གྱི་གནས་ཚུལ་ཤེས་ཐུབ་པའི་ཆེད་འབྲེལ་གཏུགས་ཀྱི་གནས་ཚུལ་གཅིག་སྤྱོད་བྱེད་དགོས།'
      ),
      processTitle: F('The Four Steps to Enrollment', 'भर्ना प्रक्रिया', 'ཐོ་འགོད་ཀྱི་རིམ་པ།'),
      processBody: F(
        'Step 1 - The Digital Inquiry: submit the initial application form through our website. Step 2 - The Monastic Invitation: shortlisted families stay at the guest house for a 3-day trial evaluation. Step 3 - The Spiritual & Academic Dialogue: a gentle interview with the Principal. Step 4 - The Hair-Cutting & Robe Ceremony: the student is assigned to his house and officially enters the novice order.',
        'परिवारहरूले तलको अनलाइन आवेदन फारम पेश गर्न सक्छन्। भर्ना परिषद्ले आवेदनहरूको समीक्षा गर्छ र दुई हप्ताभित्र परिवारहरूसँग सम्पर्क गरिन्छ। स्वीकृत विद्यार्थीहरूलाई अन्तिम दीक्षा र भर्नाअघि भ्रमणका लागि निम्तो दिइन्छ।',
        'ཁྱིམ་ཚང་རྣམས་ཀྱིས་འོག་ཏུ་ཡོད་པའི་གློག་བརྙན་ཞུ་འདེགས་ཀྱི་ཕོར་མ་ཞིག་འབུལ་ཆོག། ཐོ་འགོད་ཀྱི་ཚོགས་པས་ཞུ་འདེགས་རྣམས་ཞིབ་བཤེར་བྱེད་ཅིང་ཁྱིམ་ཚང་རྣམས་ལ་ཟླ་བ་ཕྱེད་ཀྱི་ནང་འབྲེལ་གཏུགས་ཐོབ་ཀྱིན་ཡོད། ལེགས་པར་ངོས་འཛིན་བྱས་པའི་སློབ་མ་རྣམས་ལ་རབ་བྱུང་དང་ཐོ་འགོད་གཏན་པའི་སྔོན་དུ་ལྟ་རྟོག་ཞིག་གི་ཆེད་དུ་དགའ་བསུ་ཞུ་བཞིན་ཡོད།'
      ),
    },
    gallery: {
      introTitle: F('Media Gallery', 'ग्यालरी र महोत्सवहरू', 'པར་ཁང་དང་དུས་ཆེན་རྣམས།'),
      introBody: F(
        'From lively debate in the courtyard to the sacred murals of our shrines and joyful games during breaks, our gallery celebrates the rhythm of monastic life. Browse the collections below.',
        'महान मोनलाम प्रार्थना महोत्सवदेखि दैनिक कक्षा जीवनसम्म, हाम्रो ग्यालरीले मठ जीवनको लयलाई मनाउँछ। समारोह, बहस, थाङ्का चित्रकला र हाम्रो वर्षलाई चिन्ह लगाउने महोत्सवहरूका तस्बिरहरू हेर्नुहोस्।',
        'སྨོན་ལམ་ཆེན་མོའི་དུས་ཆེན་ནས་རྒྱུན་ལྡན་གྱི་སློབ་ཚན་གྱི་འཚོ་བའི་བར་ང་ཚོའི་པར་ཁང་གིས་དགོན་སྡེའི་འཚོ་བའི་རྣམ་པ་བསྟན་བཞིན་ཡོད། མཆོད་སྒྲིག་དང་། རྩོད་འཐབ། ཐང་གའི་རིག་རྩལ། ལོ་འཁོར་གྱི་དུས་ཆེན་བཅས་ཀྱི་པར་རྣམས་ལྟ་བར་འཚལ།'
      ),
    },
    donations: {
      introTitle: F('Support Our Work', 'सहयोग र दान', 'རྒྱབ་སྐྱོར་དང་ཞལ་འདེབས།'),
      introBody: F(
        'Giving free education, meals, clothing and housing to every young monk in our care is a monumental financial task. We rely on the kindness of sponsors and well-wishers, and every gift makes a real difference.',
        'थार मन्जुश्रीका प्रत्येक भिक्षुलाई पूर्ण रूपमा दाताहरूको कृपाबाट सहयोग गरिन्छ। तपाईंको उपहार — एकमुष्ट वा मासिक — ले खाना, लुगा, स्वास्थ्य सेवा र शिक्षा प्रदान गर्छ। हरेक रुपैयाँको हिसाब राखिन्छ र पारदर्शी रूपमा प्रतिवेदन दिइन्छ।',
        'ཐར་དམན་ཛུ་ཤྲིའི་གྲྭ་བ་རེ་རེ་ཡང་སྦྱིན་བདག་རྣམས་ཀྱི་བྱམས་བརྩེའི་སྒོ་ནས་ཡོངས་རྫོགས་རྒྱབ་སྐྱོར་བྱེད་བཞིན་ཡོད། ཁྱེད་ཀྱི་སྦྱིན་པ་ནི་ཐེངས་རེའམ་ཟླ་རྒྱུན་གང་ཡིན་རུང་ཟས་དང་། གོས་ཆ། སྨན་བཅོས། སློབ་གཉེར་བཅས་སྤྲོད་ཀྱིན་ཡོད། གྲངས་ཐང་རེ་རེའི་རྩིས་ཐོ་ཉར་ཞིང་གསལ་པོར་སྙན་ཞུ་བྱེད་བཞིན་ཡོད།'
      ),
      bankTitle: F('Direct Wire Transfer Coordinates', 'बैंक स्थानान्तरण विवरण', 'དངུལ་ཁང་གི་བརྒྱུད་སྤྲོད་གནས་ཚུལ།'),
      bankBody: F(
        'Donations may also be sent directly by bank transfer. Please write your email in the transfer note so we can send you a receipt and acknowledgment.',
        'दानहरू बैंक स्थानान्तरणबाट पनि सिधै पठाउन सकिन्छ। हामीले तपाईंलाई रसिद र स्वीकृति पठाउन सकौं भनेर स्थानान्तरण नोटमा आफ्नो इमेल लेख्नुहोस्।',
        'ཞལ་འདེབས་དངུལ་ཁང་གི་བརྒྱུད་སྤྲོད་ཀྱི་སྒོ་ནས་ཐད་ཀར་བཏང་ཆོག ང་ཚོས་ཁྱེད་ལ་ཐོབ་ཐང་དང་ལན་ཆ་ཕྱིར་སྤྲོད་ཐུབ་པའི་ཆེད་དུ་བརྒྱུད་སྤྲོད་ཀྱི་མཆན་ཡིག་ཏུ་ཁྱེད་ཀྱི་གློག་འཕྲིན་འབྲི་རོགས།'
      ),
      transparencyTitle: F('Our Guarantee of Financial Honesty', 'वित्तीय पारदर्शिता', 'རྩིས་གནས་གསལ་པོ།'),
      transparencyBody: F(
        '"We operate with complete transparency. Your contribution goes directly toward the food, education, clothing and housing of our young monks. We publish our annual audited accounts on this page each year for public verification."',
        'हामी सबै आम्दानी र खर्चको विवरणसहित वार्षिक प्रतिवेदन प्रकाशित गर्छौं। दाताहरूले आफ्नो योगदान कसरी प्रयोग भयो भन्ने विस्तृत विवरण जुनसुकै समय माग्न सक्छन्।',
        'ང་ཚོས་འབྲེལ་ཡོད་འཛུགས་སྐྲུན་ཡོངས་ཀྱི་ཐོ་ཉར་ཡོད་པའི་ལོ་དེབ་རེ་རེ་དཔེ་སྐྲུན་བྱེད་བཞིན་ཡོད། སྦྱིན་བདག་རྣམས་ཀྱིས་རང་གི་སྦྱིན་པ་གང་ལུགས་ཀྱིས་བེད་སྤྱོད་བྱས་པའི་གསལ་བཤད་རེ་རེ་དུས་གང་འདྲ་རུང་ཞུ་ཆོག་བཞིན་ཡོད།'
      ),
    },
    contact: {
      introTitle: F('Connect With Us', 'सम्पर्क र स्थान', 'འབྲེལ་གཏུགས་དང་ས་གནས།'),
      introBody: F(
        'We would love to welcome you to our campus. Plan a respectful, mindful visit to our temple grounds at Tharlam Monastery in Boudha, Kathmandu. Please reach out before planning your visit.',
        'हामी तपाईंलाई हाम्रो क्याम्पसमा स्वागत गर्न चाहन्छौं। प्रायः दिन बिहानको प्रार्थना र साँझको अध्ययनको बीचमा आगन्तुकहरूलाई स्वागत गरिन्छ। भ्रमणको योजना बनाउनुअघि कृपया सम्पರ್ಕ गर्नुहोस्।',
        'ང་ཚོས་ཁྱེད་ཅག་ང་ཚོའི་གླིང་འཁོར་དུ་དགའ་བསུ་ཞུ་འདོད། ཉིན་མང་པོར་ཐོག་མའི་མཆོད་པ་དང་དགོང་མོའི་སློབ་སྦྱོང་གི་བར་དུ་མི་ཚོར་དགའ་བསུ་ཞུ་བཞིན་ཡོད། ལྟ་རྟོག་གི་འཆར་གཞི་བཟོ་བའི་སྔོན་དུ་འབྲེལ་གཏུགས་གནང་རོགས།'
      ),
    },
  },
}

export const defaultAnnouncements = [
  {
    id: 'ann-1',
    date: '2026-07-25',
    en: { title: 'Admissions Open for the 2026/27 Academic Year', body: 'We are now accepting applications for new students. Please visit the Admissions page to apply online before the end of August.' },
    ne: { title: 'शैक्षिक वर्ष २०२६/२७ का लागि भर्ना खुला', body: 'हामी अहिले नयाँ विद्यार्थीहरूका लागि आवेदन लिइरहेका छौं। अगस्टको अन्त्यअघि अनलाइन आवेदन गर्न कृपया भर्ना पृष्ठमा जानुहोस्।' },
    bo: { title: 'སློབ་གཉེར་ལོ་༢༠༢༦/༢༧ ཀྱི་ཐོ་འགོད་ཕྱེ་ཡོད།', body: 'སློབ་མ་གསར་པ་རྣམས་ཀྱི་ཞུ་འདེགས་ད་ལྟ་ལེན་བཞིན་ཡོད། ཟླ་བ་བརྒྱད་པའི་མཇུག་གི་སྔོན་དུ་ཐོ་འགོད་གྱི་ཤོག་ངོས་ནས་གློག་བརྙན་ཐོག་ཞུ་འདེགས་གནང་རོགས།' },
  },
  {
    id: 'ann-2',
    date: '2026-07-10',
    en: { title: 'Monlam Prayer Festival 2026', body: 'Join us from 12–14 August for our annual Monlam prayer festival on campus. All are warmly welcome.' },
    ne: { title: 'मोनलाम प्रार्थना महोत्सव २०२६', body: 'हाम्रो वार्षिक मोनलाम प्रार्थना महोत्सवका लागि अगस्ट १२–१४ मा हामीसँग सामेल हुनुहोस्। सबैलाई हार्दिक स्वागत छ।' },
    bo: { title: 'སྨོན་ལམ་ཆེན་མོ། ༢༠༢༦', body: 'ཟླ་བ་བརྒྱད་པའི་ཚེས་༡༢–༡༤ བར་ང་ཚོའི་གླིང་འཁོར་དུ་རྒྱུན་ལྡན་གྱི་སྨོན་ལམ་ཆེན་མོར་ཐུན་མོང་དུ་ཞུགས་རོགས། ཚང་མར་དགའ་བསུ་ཞུ་བཞིན་ཡོད།' },
  },
  {
    id: 'ann-3',
    date: '2026-06-18',
    en: { title: 'New Monastery Library Opened', body: 'Thanks to the generosity of our supporters, a new two-storey library has opened with over 10,000 texts in Tibetan, Sanskrit and English.' },
    ne: { title: 'नयाँ मठ पुस्तकालय खुल्यो', body: 'हाम्रा समर्थकहरूको उदारताबाट तिब्बती, संस्कृत र अंग्रेजीमा १०,००० भन्दा बढी ग्रन्थसहित दुई तल्ले नयाँ पुस्तकालय खुलेको छ।' },
    bo: { title: 'དགོན་སྡེའི་དཔེ་མཛོད་གསར་པ་ཕྱེ་ཡོད།', body: 'ང་ཚོའི་རྒྱབ་སྐྱོར་པ་རྣམས་ཀྱི་བྱམས་བརྩེའི་སྒོ་ནས་བོད་ཡིག་དང་། ལེགས་སྦྱར། དབྱིན་ཡིག་བཅས་ཀྱི་དཔེ་ཆ་ཁྲི་ལྷག་ལྡན་པའི་ཐོག་ཐོག་གཉིས་ཀྱི་དཔེ་མཛོད་གསར་པ་ཞིག་ཕྱེ་ཡོད།' },
  },
]

export const defaultGallery = [
  { id: 'g1', title: 'Monlam Prayer Festival', category: 'festival', url: 'https://picsum.photos/seed/monlam1/800/600', uploadedAt: '2026-07-01' },
  { id: 'g2', title: 'Morning Prayers in the Main Hall', category: 'ceremony', url: 'https://picsum.photos/seed/monlam2/800/600', uploadedAt: '2026-06-20' },
  { id: 'g3', title: 'Philosophy Debate Practice', category: 'school', url: 'https://picsum.photos/seed/monlam3/800/600', uploadedAt: '2026-06-05' },
  { id: 'g4', title: 'Thangka Painting Class', category: 'school', url: 'https://picsum.photos/seed/monlam4/800/600', uploadedAt: '2026-05-22' },
  { id: 'g5', title: 'Lama Dance Festival', category: 'festival', url: 'https://picsum.photos/seed/monlam5/800/600', uploadedAt: '2026-04-30' },
  { id: 'g6', title: 'Losar New Year Celebrations', category: 'festival', url: 'https://picsum.photos/seed/monlam6/800/600', uploadedAt: '2026-02-15' },
]
