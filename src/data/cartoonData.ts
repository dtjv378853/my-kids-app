import { CartoonCharacter, CartoonEpisode, SoundboardItem } from '../types';

// Character Avatars & Scenes
import bondokImg from '../assets/images/bondok_cartoon_hero_1790770418387.jpg';
import basbousaImg from '../assets/images/basbousa_cartoon_cat_1790770434109.jpg';
import streetImg from '../assets/images/cartoon_fun_street_1790770448204.jpg';
import ammiFelfelImg from '../assets/images/ammi_felfel_parrot_1790770463783.jpg';

export const CARTOON_CHARACTERS: Record<string, CartoonCharacter> = {
  bondok: {
    id: 'bondok',
    name: 'بندق',
    nameEn: 'Bondok',
    nickname: 'الأرنوب الشقي أبو أفكار مجنونة',
    avatar: bondokImg,
    color: '#FF9500',
    textColor: '#8A3B00',
    borderColor: '#E07B00',
    description: 'أرنوب دمه خفيف جداً، بيحب الأكل والضحك والمغامرات، ودائماً بيوقع نفسه في مواقف مضحكة بس قلبه أبيض وبيحب أصحابه!',
    catchphrase: 'يا خبر أبيض يا جدعان! إيه اللخبطة دي؟!',
    favoriteFood: 'طعمية سخنة مقرمشة وجزر بالكراميل',
    favoriteToy: 'سكوتر النفاثة السريعة',
    phrases: [
      'يا خبر أبيض يا جدعان! إيه اللي حصل ده؟!',
      'بطني بتعزف سيمفونية كشري وعايزة تاكل!',
      'أنا جاهز للمغامرة.. يلا بينا نطير!',
      'إيه الحلاوة دي كلها! كدة اللعب يحلو!',
      'يا بسبوسة أنقذيني بسرعة الاختراع هينفجر!',
      'والله أنا غلبان ومكنتش قاصد خالص!'
    ]
  },
  basbousa: {
    id: 'basbousa',
    name: 'بسبوسة',
    nameEn: 'Basbousa',
    nickname: 'القطة الذكية والعبقرية',
    avatar: basbousaImg,
    color: '#FF2E93',
    textColor: '#8A0047',
    borderColor: '#D41470',
    description: 'قطة شاطرة وذكية ولابسة نظارة بينك شيك. دايمًا بتفكر بهدوء وبتحل أي ورطة بندق يقع فيها!',
    catchphrase: 'اصبر يا بندق.. المخ قبل العضلات!',
    favoriteFood: 'بسكوت تونة بالسمسم وعصير فراولة مثلج',
    favoriteToy: 'العدسة المكبرة وجهاز التابلت الذكي',
    phrases: [
      'اصبر يا بندق.. المخ قبل العضلات!',
      'الحل سهل جداً بس محتاجين نشغل مخنا!',
      'أنا قولتلك 100 مرة بلاش تدوس على الزرار الأحمر!',
      'برافو يا أبطال، خطتنا نجحت 10 على 10!',
      'يا عيني عليك يا بندق لما تتهور!',
      'ولا تشيل هم.. بسبوسة العبقرية هنا!'
    ]
  },
  ammi_felfel: {
    id: 'ammi_felfel',
    name: 'عم فلفل',
    nameEn: 'Ammi Felfel',
    nickname: 'الببغاء صاحب دكان السعادة',
    avatar: ammiFelfelImg,
    color: '#00B4D8',
    textColor: '#005F73',
    borderColor: '#0096C7',
    description: 'ببغاء حكيم ودود ولابس طربوش أحمر كيوت، صاحب أشهر دكان ألعاب وحلويات في حارة الشطار!',
    catchphrase: 'يا صباح السعادة والسكر زيادة يا شطار!',
    favoriteFood: 'فول سوداني محمص وطعمية مخصوصة بالكزبرة',
    favoriteToy: 'صندوق الألعاب السحرية والمزامير',
    phrases: [
      'يا صباح السعادة والسكر زيادة على أحلى عيون!',
      'طعمية سخنة مولعة ومقرمشة وريحتها تجنن!',
      'مين الشاطر اللي هيحل فزورة عم فلفل النهاردة؟',
      'يا ولاد الإيه! نورتوا حارة الشطار كلها!',
      'ضحكتكم دي عندي بالدنيا وما فيها!',
      'خدلك بونبوني وروق مزاجك يا جميل!'
    ]
  }
};

export const CARTOON_EPISODES: CartoonEpisode[] = [
  {
    id: 'ep-1',
    number: 1,
    title: 'سر كنز الطعمية الذهبية',
    subtitle: 'حارة الشطار واللغز المقرمش!',
    coverImage: streetImg,
    badge: 'الحلقة الأولى 🌟',
    synopsis: 'بندق صحي الصبح وبطنه بتصوصو من الجوع! عم فلفل مخبي كنز الطعمية الذهبية المقرمشة في حارة الشطار، ولازم بندق وبسبوسة يحلوا فوازير الشارع عشان يوصلوا له!',
    durationText: '4 دقائق كرتونية',
    starsReward: 15,
    scenes: [
      {
        id: 'ep1-sc1',
        title: 'المشهد الأول: زغاريد بطن بندق!',
        bgType: 'street',
        tip: 'اضغط على بندق وبسبوسة لتسمع أصواتهم وحركاتهم الكرتونية!',
        dialogues: [
          {
            id: 'd1',
            characterId: 'bondok',
            characterName: 'بندق',
            text: 'يا بسبووووسة! إلحقيني يا بنتي! بطني مش بس بتصوصو.. دي بتعزف سيمفونية كشري وطعمية مع بعض! مش قادر أمشي خطوة واحدة!',
            emotion: 'hungry',
            soundEffect: 'boing'
          },
          {
            id: 'd2',
            characterId: 'basbousa',
            characterName: 'بسبوسة',
            text: 'يا خبر عليك يا بندق! هو أنت لسه صاحي من النوم بتفكر في بطنك على طول؟! اصحى وفوق كدة، النهاردة عم فلفل عامل مفاجأة كبيرة في الحارة!',
            emotion: 'funny',
            soundEffect: 'giggle'
          },
          {
            id: 'd3',
            characterId: 'ammi_felfel',
            characterName: 'عم فلفل',
            text: 'يا صباح السعادة والسكر زيادة يا عصافير الحارة! أهلاً ببندق الكسول وبسبوسة الذكية! النهاردة عملت لكم كنز الطعمية الذهبية الكبرى.. بس الكنز مقفول بخزنة مسحورة!',
            emotion: 'happy',
            soundEffect: 'pop'
          }
        ],
        choice: {
          prompt: 'عم فلفل سأل سؤال: يا شطار، إيه هي فزورة الطعمية؟',
          helperText: 'ساعد بندق يختار الإجابة الصح عشان بطنه تسكت!',
          options: [
            {
              id: 'c1',
              text: 'أكلة مدورة وسخنة ومقرمشة عليها سمسم وشطة! 🧆',
              reactionText: 'الله عليك يا معلم! هي دي الطعمية الذهبية اللي تفرح القلب!',
              characterReactionId: 'ammi_felfel',
              soundEffect: 'celebrate'
            },
            {
              id: 'c2',
              text: 'موزة لونها أزرق بتطلع في الشتاء! 🍌',
              reactionText: 'موزة زرقاء إيه يا بندق بس حرام عليك! هو حد شاف موزة زرقاء قبل كدة؟!',
              characterReactionId: 'basbousa',
              soundEffect: 'boing'
            }
          ]
        }
      },
      {
        id: 'ep1-sc2',
        title: 'المشهد الثاني: خريطة الشارع العجيب!',
        bgType: 'street',
        tip: 'اختر الطريق اللي بندق وبسبوسة هيمشوا فيه!',
        dialogues: [
          {
            id: 'd4',
            characterId: 'basbousa',
            characterName: 'بسبوسة',
            text: 'بص يا بندق في الخريطة.. دكان عم فلفل قدامه طريقين عشان نوصل له أسرع:',
            emotion: 'thinking',
            soundEffect: 'whistle'
          },
          {
            id: 'd5',
            characterId: 'bondok',
            characterName: 'بندق',
            text: 'يا ترى يا أصحابي الحلوين نعدي من نفق البلالين الملونة وننط، ولا نركب سكوتر الكارتون السريع بيب بيب؟',
            emotion: 'excited',
            soundEffect: 'boing'
          }
        ],
        choice: {
          prompt: 'اختار لبندق وبسبوسة الطريق الأحلى:',
          options: [
            {
              id: 'path1',
              text: 'نط في نفق البلالين الملونة وزحليقة الضحك! 🎈',
              reactionText: 'وووووووي! يا سلام على الزحلقة والبلالين.. إيه الجمال ده كله!',
              characterReactionId: 'bondok',
              soundEffect: 'boing'
            },
            {
              id: 'path2',
              text: 'نركب سكوتر الكارتون النفاث ونطير بسرعة البرق! 🛴⚡',
              reactionText: 'بيييب بيييب! وسع وسع لأسرع أبطال في الحارة كلها!',
              characterReactionId: 'basbousa',
              soundEffect: 'whistle'
            }
          ]
        }
      },
      {
        id: 'ep1-sc3',
        title: 'المشهد الثالث: كنز الطعمية الذهبية والاحتفال!',
        bgType: 'street',
        tip: 'الحفلة بدأت والكل بيرقص ومبسوط!',
        dialogues: [
          {
            id: 'd6',
            characterId: 'ammi_felfel',
            characterName: 'عم فلفل',
            text: 'مبروك يا أبطال حارة الشطار! وصلتوا بالسلامة وحليتوا اللغز.. خدوا بقى أحلى طبق طعمية دهبية سخنة ومقرمشة مع رغيف عيش بلدي وسلطة طماطم تجنن!',
            emotion: 'proud',
            soundEffect: 'celebrate'
          },
          {
            id: 'd7',
            characterId: 'bondok',
            characterName: 'بندق',
            text: 'يا وعدي يا وعدي! همممم قرمشة ولذاذة ملهاش حل! بطني سكتت وخلاص بقيت بطل العالم في أكل الطعمية!',
            emotion: 'happy',
            soundEffect: 'giggle'
          },
          {
            id: 'd8',
            characterId: 'basbousa',
            characterName: 'بسبوسة',
            text: 'شفت يا بندق؟ لما بنشغل مخنا ونمشي سوا، بنوصل للكنز وبنضحك من قلبنا! شكراً يا عم فلفل وشكراً لأصحابنا الشطار اللي ساعدونا!',
            emotion: 'proud',
            soundEffect: 'celebrate'
          }
        ]
      }
    ]
  },
  {
    id: 'ep-2',
    number: 2,
    title: 'روبوت الآيس كريم المجنون',
    subtitle: 'انفجار نكهات المانجو والفراولة في الصيف!',
    coverImage: bondokImg,
    badge: 'الحلقة الثانية 🍦',
    synopsis: 'الجو كان حر نار، فبندق حب يعمل مخترع وصنع مكنة آيس كريم سريعة.. بس دوست غلط على الزرار البمبي خلت المكنة تطلق كرات آيس كريم في كل حتة!',
    durationText: '5 دقائق كرتونية',
    starsReward: 20,
    scenes: [
      {
        id: 'ep2-sc1',
        title: 'المشهد الأول: اختراع بندق العجيب!',
        bgType: 'invention_lab',
        tip: 'انتبه من الزرار الأحمر والبمبي!',
        dialogues: [
          {
            id: 'd2_1',
            characterId: 'bondok',
            characterName: 'بندق',
            text: 'تا داااا! رحبوا معايا بأعظم اختراع في تاريخ الحارة: "مكنة الآيس كريم النفاثة 5000"! حطي كوز الفراولة هنا يا بسبوسة وهتشوفي السحر!',
            emotion: 'excited',
            soundEffect: 'boing'
          },
          {
            id: 'd2_2',
            characterId: 'basbousa',
            characterName: 'بسبوسة',
            text: 'استنى يا بندق! السلوك دي متلخبطة وفي دخان طالع من الموتور! إوعى تدوس على الزرار البمبي الكبير ده شكله هيعمل مصيبة!',
            emotion: 'shocked',
            soundEffect: 'whistle'
          },
          {
            id: 'd2_3',
            characterId: 'bondok',
            characterName: 'بندق',
            text: 'متخافيش يا خوافة.. دي دوسة صغنونة خالص.. تك! يا خبر أبيض.. المكنة بتعمل صوت غريب: كرك كرك طووووط!',
            emotion: 'shocked',
            soundEffect: 'splat'
          }
        ],
        choice: {
          prompt: 'المكنة بدأت تهتز وتفرقع كرات آيس كريم! نعمل إيه يا بطل؟',
          options: [
            {
              id: 'opt_catch',
              text: 'نجري نجيب البساكيت والعلب ونجمع الآيس كريم في الهوا! 🍨',
              reactionText: 'فكرة جهنمية! الآيس كريم ده ميتفوتش لازم نجمعه كله!',
              characterReactionId: 'bondok',
              soundEffect: 'celebrate'
            },
            {
              id: 'opt_umbrella',
              text: 'نفتح شمسية ونحمي نفسنا من المطر الحلو! ⛱️',
              reactionText: 'احموا روسكم يا جدعان.. مطر مانجو وشوكولاتة نازل من السما!',
              characterReactionId: 'ammi_felfel',
              soundEffect: 'boing'
            }
          ]
        }
      },
      {
        id: 'ep2-sc2',
        title: 'المشهد الثاني: لعبة مسك كرات الآيس كريم!',
        bgType: 'street',
        interactiveGame: 'icecream',
        tip: 'المس كرات الآيس كريم المتطايرة واجمعها كلها لبندق وبسبوسة!',
        dialogues: [
          {
            id: 'd2_4',
            characterId: 'basbousa',
            characterName: 'بسبوسة',
            text: 'يا أصحابي بسرعة ساعدونا! المسوا كرات الآيس كريم على الشاشة واجمعوها قبل ما تقع على الأرض وتبهدل الشارع!',
            emotion: 'excited',
            soundEffect: 'pop'
          }
        ]
      },
      {
        id: 'ep2-sc3',
        title: 'المشهد الثالث: وليمة الآيس كريم اللذيذة!',
        bgType: 'street',
        tip: 'الحارة كلها بتأكل ومبسوطة!',
        dialogues: [
          {
            id: 'd2_5',
            characterId: 'ammi_felfel',
            characterName: 'عم فلفل',
            text: 'ههههه يا صباح الآيس كريم بالمانجا! ده الشارع كله بقى طعمه فواكه مثلجة ومنعشة.. تسلم إيدك يا بندق حتى لما بتلخبط بيطلع منك خير ولذاذة!',
            emotion: 'happy',
            soundEffect: 'celebrate'
          },
          {
            id: 'd2_6',
            characterId: 'bondok',
            characterName: 'بندق',
            text: 'شفتي بقى يا بسبوسة؟ قولتلك أنا مخترع عبقري.. بس محتاج شوية نظافة وتظبيط سلوك بس ههههه!',
            emotion: 'funny',
            soundEffect: 'giggle'
          }
        ]
      }
    ]
  },
  {
    id: 'ep-3',
    number: 3,
    title: 'سر الصديق المتخبي في شجرة التوت',
    subtitle: 'مين اللي عنده زغطة وبيعمل هيك هيك؟',
    coverImage: basbousaImg,
    badge: 'الحلقة الثالثة 🌳',
    synopsis: 'صوت غريب طالع من ورا شجرة التوت.. بندق خايف ومفكر إنه وحش فضائي، وبسبوسة بتكتشف الحقيقة بمكبر الصوت الذكي!',
    durationText: '4 دقائق كرتونية',
    starsReward: 25,
    scenes: [
      {
        id: 'ep3-sc1',
        title: 'المشهد الأول: الصوت الغريب!',
        bgType: 'playpark',
        tip: 'اسمع الصوت الغريب وقرب من الشجرة!',
        dialogues: [
          {
            id: 'd3_1',
            characterId: 'bondok',
            characterName: 'بندق',
            text: 'يا مامييي! يا بسبوسة اقفي ورايا.. أو بالأحرى استني أنا اللي هقف وراكي! في وحش غريب جوة الشجرة بيقول: هيك.. ها ها.. هيك!',
            emotion: 'shocked',
            soundEffect: 'boing'
          },
          {
            id: 'd3_2',
            characterId: 'basbousa',
            characterName: 'بسبوسة',
            text: 'وحش إيه يا أرنوب يا جبان! ده صوت حد بيضحك وعنده زغطة جامدة مش قادر يوقفها! تعالى نقرب ونشوف مين ده!',
            emotion: 'thinking',
            soundEffect: 'whistle'
          }
        ],
        choice: {
          prompt: 'نعمل إيه عشان نعرف مين ورا الشجرة؟',
          options: [
            {
              id: 'op3_1',
              text: 'نبعد ورق الشجر بالراحة ونقول: مين هناك يا قمر؟ 🌿',
              reactionText: 'يا عيني عليك يا حنين.. كدة مش هيخاف مننا ويطل!',
              characterReactionId: 'basbousa',
              soundEffect: 'pop'
            },
            {
              id: 'op3_2',
              text: 'بندق يرمي جزرة ويقول: استسلم يا وحش التوت! 🥕',
              reactionText: 'يا بندق هتحدف الجزرة في وش صاحبنا؟! اصبر بالهداوة!',
              characterReactionId: 'ammi_felfel',
              soundEffect: 'boing'
            }
          ]
        }
      },
      {
        id: 'ep3-sc2',
        title: 'المشهد الثاني: الكوالا الصغير سمسم!',
        bgType: 'playpark',
        tip: 'ساعد سمسم يتخلص من الزغطة!',
        dialogues: [
          {
            id: 'd3_3',
            characterId: 'ammi_felfel',
            characterName: 'عم فلفل',
            text: 'ده طلع سمسم الكوالا الصغير الصغنن! شارب عصير التوت المثلج بسرعة من غير ما يشرب على مهله، فجاله زغطة متواصلة!',
            emotion: 'happy',
            soundEffect: 'giggle'
          },
          {
            id: 'd3_4',
            characterId: 'basbousa',
            characterName: 'بسبوسة',
            text: 'الحل عندي! اشرب يا سمسم بوق مية دافية واحدة واحدة، ونعد كلنا مع بعض للـ 5.. يلا يا شطار: 1.. 2.. 3.. 4.. 5!',
            emotion: 'proud',
            soundEffect: 'celebrate'
          },
          {
            id: 'd3_5',
            characterId: 'bondok',
            characterName: 'بندق',
            text: 'الله! الزغطة راحت وبقى زي الفل! تعالى بقى يا سمسم نلعب في الحارة وناكل طعمية سوا، بس تشرب العصير براحة المرة الجاية!',
            emotion: 'happy',
            soundEffect: 'celebrate'
          }
        ]
      }
    ]
  }
];

export const SOUNDBOARD_ITEMS: SoundboardItem[] = [
  {
    id: 'sb-1',
    characterId: 'bondok',
    title: 'يا خبر أبيض!',
    quote: 'يا خبر أبيض يا جدعان! إيه اللخبطة دي؟!',
    emoji: '🐰💥',
    color: '#FF9500'
  },
  {
    id: 'sb-2',
    characterId: 'bondok',
    title: 'بطني بتصوصو',
    quote: 'بطني بتعزف سيمفونية كشري وعايزة طعمية سخنة مقرمشة!',
    emoji: '🧆🤤',
    color: '#FF7A00'
  },
  {
    id: 'sb-3',
    characterId: 'basbousa',
    title: 'المخ قبل العضلات',
    quote: 'اصبر يا بندق.. المخ قبل العضلات!',
    emoji: '🐱🧠',
    color: '#FF2E93'
  },
  {
    id: 'sb-4',
    characterId: 'basbousa',
    title: 'بلاش الزرار ده!',
    quote: 'أنا قولتلك 100 مرة بلاش تدوس على الزرار الأحمر!',
    emoji: '🛑😹',
    color: '#E60067'
  },
  {
    id: 'sb-5',
    characterId: 'ammi_felfel',
    title: 'يا صباح السعادة',
    quote: 'يا صباح السعادة والسكر زيادة على أحلى عيون في الدنيا!',
    emoji: '🦜✨',
    color: '#00B4D8'
  },
  {
    id: 'sb-6',
    characterId: 'ammi_felfel',
    title: 'طعمية سخنة',
    quote: 'طعمية سخنة مقرمشة بالسمسم والشطة لعيونكم يا شطار!',
    emoji: '🔥🧆',
    color: '#028090'
  },
  {
    id: 'sb-7',
    characterId: 'bondok',
    title: 'ضحكة كرتونية',
    quote: 'ههههههه ووووي! طيران في الهوا!',
    emoji: '🚀😂',
    color: '#FFAA00'
  },
  {
    id: 'sb-8',
    characterId: 'basbousa',
    title: 'شطار أوي!',
    quote: 'برافو برافو يا أبطال، خطتنا نجحت 10 على 10!',
    emoji: '🌟🎉',
    color: '#9B5DE5'
  }
];
