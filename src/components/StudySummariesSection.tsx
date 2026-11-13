import React, { useState } from 'react';
import {
  GraduationCap,
  BookOpen,
  Brain,
  Palette,
  Heart,
  Music,
  Lightbulb,
  Search,
  Baby,
  Cpu,
  ShieldAlert,
  Sparkles,
  Layers,
  Scale,
  Smile,
  Compass,
  Activity,
  Radio,
} from 'lucide-react';

export interface CourseDetail {
  id: string;
  title: string;
  code?: string;
  category: 'psychology' | 'curriculum' | 'health_special' | 'art_skills';
  categoryLabel: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  keyConcepts: string[];
  lectureTakeaways: { title: string; desc: string }[];
  examTip: string;
  interviewQuestion: string;
}

export const StudySummariesSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const courses: CourseDetail[] = [
    {
      id: 'dev-psych',
      title: 'علم نفس نمو الطفل (Child Developmental Psychology)',
      category: 'psychology',
      categoryLabel: 'علم النفس والنمو 🧠',
      icon: Baby,
      color: 'bg-indigo-100 text-indigo-700 border-indigo-200',
      keyConcepts: [
        'مراحل بياجيه للنمو المعرفي: مرحلة ما قبل العمليات (Preoperational Stage من 2-7 سنوات) وتميزها بالتمركز حول الذات (Egocentrism) والإحيائية (Animism).',
        'نظرية إريكسون النفس-اجتماعية: أزمة (المبادأة مقابل الشعور بالذنب Initiative vs. Guilt) وأهمية تشجيع استكشاف الطفل دون قمع.',
        'نظرية فيجوتسكي (Vygotsky): منطقة النمو الوشيك (ZPD) والسقالات التعليمية (Scaffolding) ودور أقران الطفل والمعلمة.',
        'قوانين النمو: النمو يسير من الرأس إلى القدمين (Cephalocaudal)، ومن المركز إلى الأطراف (Proximodistal).'
      ],
      lectureTakeaways: [
        {
          title: 'ظاهرة التمركز حول الذات (Egocentrism)',
          desc: 'الطفل لا يقصد الأنانية؛ بل يعتقد بيولوجياً ونفسياً أن الجميع يرى ويشعر بما يراه هو فقط (تجربة الجبال الثلاثة لبياجيه).'
        },
        {
          title: 'الإحيائية (Animism)',
          desc: 'إضفاء الحياة والمشاعر على الجمادات (مثل: الكرسي شرير لأنه ضربني، والدمية جائعة تريد أن تأكل).'
        }
      ],
      examTip: 'سؤال امتحان شهير: قارني بين نظرة بياجيه للغة (كلام متمركز حول الذات) ونظرة فيجوتسكي (كلام داخلي أداة للتفكير).',
      interviewQuestion: 'لو طفل 4 سنين رفض يعطي لعبته لزميله، هل تتهميه بالأنانية؟ الإجابة: لا، هذا تطور طبيعي لتثبيت ملكية الذات ويُعالج تدريجياً باللعب التشاركي.'
    },
    {
      id: 'music-education',
      title: 'التربية الموسيقية والأناشيد الإيقاعية لطفل الروضة (Music Education)',
      category: 'art_skills',
      categoryLabel: 'الفنون والموسيقى والمسرح 🎵',
      icon: Music,
      color: 'bg-rose-100 text-rose-700 border-rose-200',
      keyConcepts: [
        'طريقة دالكروز (Émile Jaques-Dalcroze): التعبير الحركي الإيقاعي (Eurhythmics) وتجسيد النغمات بحركة الجسد.',
        'طريقة كوداي (Zoltán Kodály): الصولفيج النسبي واستخدام إشارات اليد (Curwen Hand Signs) وأغاني التراث الفولكلوري.',
        'طريقة أورف (Carl Orff): دمج الموسيقى بالحركة والكلمة والارتجال باستخدام آلات الإيقاع البسيطة (Orff Instruments مثل الميتالوفون والماراكاس والدفوف).',
        'عناصر التربية الموسيقية للطفل: تمييز طبقة الصوت (High/Low)، شدة الصوت (Loud/Soft)، وسرعة الإيقاع (Fast/Slow).'
      ],
      lectureTakeaways: [
        {
          title: 'آلات الإيقاع غير النغمية (Percussion Instruments)',
          desc: 'مثل المثلث المعدني (Triangle)، الدفوف (Tambourine)، والصنوج (Cymbals)؛ تُستخدم لتنمية التوافق العضلي وضبط الإيقاع الزمني.'
        },
        {
          title: 'الإشارات اليدوية للنغمات (Curwen Hand Signs)',
          desc: 'حركات حسية بصرية بكف اليد ترمز لنغمات السلم الموسيقي (دو، ري، مي...) وتساعد الأطفال على الغناء السليم بنغمة صحيحة.'
        }
      ],
      examTip: 'سؤال امتحان مشهور جداً: قارني بين فلسفة أورف ودالكروز في التربية الموسيقية لطفل الروضة؟ دالكروز يركز على استجابة الجسم كله للإيقاع، بينما أورف يركز على الآلات الإيقاعية والتحدث والغناء الارتجالي.',
      interviewQuestion: 'لو طفلكِ نشا يعاني من تلعثم في الكلام كيف تساعده الأناشيد الموسيقية؟ الإيقاع الموسيقي المنتظم ينشط مسارات عصبية بديلة في الدماغ تكسر التلعثم وتمنح الطفل ثقة أثناء الغناء الجماعي.'
    },
    {
      id: 'motor-education',
      title: 'التربية الحركية والبدنية لطفل الروضة (Physical & Motor Education)',
      category: 'curriculum',
      categoryLabel: 'التربية الحركية والبدنية 🏃',
      icon: Activity,
      color: 'bg-emerald-100 text-emerald-700 border-emerald-200',
      keyConcepts: [
        'المهارات الحركية الأساسية (Fundamental Movement Skills): المهارات الانتقالية (Jumping, Hopping, Galloping)، غير الانتقالية (Bending, Twisting)، ومهارات معالجة الأدوات (Catching, Throwing, Kicking).',
        'مفهوم التوافق العضلي العصبي والوعي الفضائي (Spatial Awareness): إدراك الطفل لحدود جسده بالنسبة للمكان وزملائه وتجنب الاصطدام.',
        'التوازن الثابت والديناميكي (Static vs. Dynamic Balance): الوقوف على قدم واحدة مقابل المشي على خط متعرج أو عارضة التوازن المنخفضة.',
        'ألعاب الحركة الصغيرة والتتابع (Relay Games): تنمية الروح الرياضية، اتباع القواعد، وتفريغ الطاقة الحركية بصورة موجهة وآمنة.'
      ],
      lectureTakeaways: [
        {
          title: 'المهارات الانتقالية (Locomotor Skills)',
          desc: 'الحركات التي ينتقل بها جسم الطفل من نقطة (أ) إلى نقطة (ب) مثل الجري، الوثب، الحجل، والقفز بقدمين معاً.'
        },
        {
          title: 'مخطط الجسم (Body Schema)',
          desc: 'الصورة الذهنية الداخلية التي يكونها الطفل عن أبعاد جسده واتجاهات الحركة (يمين، يسار، أمام، خلف، فوق، تحت).'
        }
      ],
      examTip: 'تكة امتحان متكررة: لماذا تبدأ التربية الحركية بتدريب العضلات الكبيرة (Gross Motor) قبل العضلات الدقيقة (Fine Motor)؟ لأن النمو الحركي يسير من المركز إلى الأطراف ومن العضلات الكبيرة إلى الصغيرة.',
      interviewQuestion: 'كيف تخططين لحصة تربية حركية في الملعب الخارجي تراعي الأمان؟ فحص الأرضية مسبقاً، البدء بإحماء خفيف على شكل لعبة تمثيلية (مثل طيران الطيور)، التدرب على المهارة، ثم تهدئة واستعادة هدوء النبض بأنفاس عميقة.'
    },
    {
      id: 'play-psych',
      title: 'سيكولوجية اللعب وتطبيقاتها (Play Psychology)',
      category: 'psychology',
      categoryLabel: 'علم النفس والنمو 🧠',
      icon: Palette,
      color: 'bg-pink-100 text-pink-700 border-pink-200',
      keyConcepts: [
        'نظرية بياجيه في اللعب: اللعب الحسي الحركي (المهد)، اللعب الرمزي الإيهامي (الروضة)، ولعب القواعد الجماعية (المدرسة).',
        'مراحل بارتن (Mildred Parten) للتفاعل الاجتماعي في اللعب: الانعزالي، الموازي، التشاركي، والتعاوني المنظم.',
        'العلاج باللعب (Play Therapy): تفريغ شحنات الخوف والغضب وإعادة تمثيل الصدمات عبر الدمى والرمال.',
        'دور المعلمة في اللعب الحر: الملاحظة الذكية والوساطة الإيجابية دون فرض السيطرة أو إلغاء تلقائية الطفل.'
      ],
      lectureTakeaways: [
        {
          title: 'اللعب الموازي (Parallel Play)',
          desc: 'طفلان يلعبان جنباً إلى جنب بنفس الأدوات (مثل المكعبات) دون تبادل أو حديث مباشر؛ مرحلة نمو طبيعية تمهد للتعاون.'
        },
        {
          title: 'اللعب الإيهامي الدرامي (Dramatic Play)',
          desc: 'تقمص شخصية الطبيب أو الأم؛ يسهم في إنماء اللغة، نظرية العقل (Theory of Mind)، والتفاوض.'
        }
      ],
      examTip: 'سؤال متكرر: لماذا يُعتبر اللعب هو عمل الطفل الحقيقي وليس مجرد مضيعة للوقت؟ اللعب يدمج كل مجالات النمو دفعة واحدة.',
      interviewQuestion: 'متى تتدخل المعلمة في لعب الأطفال؟ فقط عند الخطر البدني أو النزاع المستعصي، أو لتقديم إثراء خفيف وسؤال استكشافي.'
    },
    {
      id: 'kinder-curric',
      title: 'مناهج وطرق تعليم طفل الروضة (Early Childhood Curriculum)',
      category: 'curriculum',
      categoryLabel: 'المناهج وطرق التدريس 📋',
      icon: BookOpen,
      color: 'bg-emerald-100 text-emerald-700 border-emerald-200',
      keyConcepts: [
        'طريقة ماريا منتسوري (Montessori): أدوات تصحيح الخطأ الذاتي، تنمية الحواس، والحرية المنضبطة داخل البيئة المهيأة.',
        'نهج ريجيو إميليا (Reggio Emilia): البيئة كمعلم ثالث، التوثيق البصري للتعلم، والمشروعات طويلة الأمد الاستقصائية.',
        'منهج هاي سكوب (HighScope): دورة (خطط - نفذ - راجع Plan-Do-Review) وإشراك الطفل في اتخاذ القرار اليومي.',
        'تنظيم بيئة التعلم والأركان الصفية: التوازن بين الأركان الهادئة (المطالعة) والأركان النشطة (الرمل، الموسيقى، البناء).'
      ],
      lectureTakeaways: [
        {
          title: 'الأدوات ذاتية التصحيح (Self-Correcting)',
          desc: 'الوسيلة التعليمية نفسها تظهر للطفل خطأه دون تدخل المعلمة (مثل أسطوانات المقابض والمكعب الوردي).'
        },
        {
          title: 'التكامل بين فترات البرنامج اليومي',
          desc: 'التسلسل المنطقي: الاستقبال، الحلقة الصباحية، اللعب الحر بالأركان، الوجبة وآدابها، اللعب الخارجي، واللقاء الأخير.'
        }
      ],
      examTip: 'ركزي على مقارنة منتسوري وريجيو إميليا: منتسوري تعتمد أدوات مقننة محددة، بينما ريجيو تعتمد على الخامات المفتوحة والبيئة الطبيعية.',
      interviewQuestion: 'كيف تخططين للركن الهادئ في الصف؟ وضعه في زاوية بعيدة عن الباب وركن المكعبات، وتوفير سجاد ناعم وإضاءة دافئة وكتب مصورة جذابة.'
    },
    {
      id: 'child-lit',
      title: 'أدب ومسرح وثقافة الطفل (Children Literature & Theatre)',
      category: 'art_skills',
      categoryLabel: 'الفنون والتعبير المسرحي 🎭',
      icon: Music,
      color: 'bg-amber-100 text-amber-700 border-amber-200',
      keyConcepts: [
        'معايير الكتاب المصور عالي الجودة (Picture Books): تناسب نسبة الرسم للنص (80% صورة في السن الصغير)، ووضوح الخط وملاءمة القيم.',
        'أنواع مسرح العرائس في الروضة: عرائس القفاز، عرائس الأصابع، خيال الظل، عرائس العصا، والماريونت.',
        'مهارات الحكواتي (Storyteller): تنغيم الصوت (Intonation)، التلوين الصوتي لشخصيات الحيوانات، والتواصل البصري ولغة الجسد.',
        'الأناشيد والأهازيج الإيقاعية: دور الوزن والقافية والتكرار اللفظي في سرعة حفظ المفاهيم وتوسيع الحصيلة اللغوية.'
      ],
      lectureTakeaways: [
        {
          title: 'التلوين النغمي في السرد',
          desc: 'تضخيم الصوت عند الدب والوحش، وترقيق الصوت عند العصفور والكتكوت لشد الانتباه الحسي للطفل.'
        },
        {
          title: 'تجنب الوعظ المباشر',
          desc: 'لا تقولي للطفل "يجب أن تكون صادقاً"؛ دعي أحداث القصة وعاقبة البطل هي التي ترسخ قيمة الصدق بوجدانه عفوياً.'
        }
      ],
      examTip: 'سؤال شفوي/تحريري: ما هي عناصر القصة الموجهة لطفل الروضة؟ حبكة بسيطة مستقيمة بدون تعقيد زماني ونهاية سعيدة تبعث الأمل.',
      interviewQuestion: 'احكي قصة للأطفال بدون كتاب؟ تفعيل دمية قفازية واستخدام مؤثرات صوتية بالفم وتفاعل الأطفال بالحركات الإيقاعية.'
    },
    {
      id: 'health-safety',
      title: 'صحة ورعاية طفل الروضة والإسعافات الأولية (Health & First Aid)',
      category: 'health_special',
      categoryLabel: 'التربية الخاصة والصحة 🤝',
      icon: ShieldAlert,
      color: 'bg-rose-100 text-rose-700 border-rose-200',
      keyConcepts: [
        'بروتوكول الإسعافات الأولية للحوادث الشائعة: الرعاف (نزيف الأنف)، الغصة والاختناق (مناورة هيمليك للأطفال)، والجروح السطحية.',
        'الأمراض المعدية الموسمية في الروضة: الجديري المائي، القمل، مرض اليد والقدم والفم (HFMD)، وإجراءات العزل الودود والتعقيم.',
        'التغذية المتوازنة للنمو الدماغي: أهمية البروتينات والدهون الصحية غير المشبعة والابتعاد عن السكريات والمواد الحافظة المهيجة للحركة.',
        'مواصفات الأمان والسلامة في قاعة النشاط: تغطية مقابس الكهرباء، زوايا الأثاث المستديرة، والتأكد من خلو الألعاب من قطع قابلة للبلع.'
      ],
      lectureTakeaways: [
        {
          title: 'التعامل الصحيح مع نزيف الأنف (الرعاف)',
          desc: 'إمالة الرأس للأمام قليلاً لمنع تدفق الدم للمعدة أو الرئتين، والضغط المستمر على الجزء اللحمي من الأنف لمدة 5-10 دقائق مع كمادة باردة.'
        },
        {
          title: 'اختبار الحجم الآمن للألعاب (Choke Tube)',
          desc: 'أي لعبة أو مجسم يمر بالكامل من خلال أنبوبة ورق التواليت يعتبر خطراً وقابلاً للاختناق للأطفال دون 4 سنوات.'
        }
      ],
      examTip: 'ركزي جداً: إرجاع الرأس للخلف عند الرعاف خطأ شائع وخطير يأتي دائماً في أسئلة الصواب والخطأ!',
      interviewQuestion: 'لو طفل شرق بقطعة تفاح في وقت الوجبة ماذا تفعلين؟ فحص مجرى التنفس، وإذا كان يختنق دون صوت تطبيق ضربات الظهر وضغطات البطن (Heimlich Maneuver) فوراً.'
    },
    {
      id: 'family-counseling',
      title: 'إرشاد الطفل وتوجيه الأسرة (Child Guidance & Family Counseling)',
      category: 'psychology',
      categoryLabel: 'علم النفس والنمو 🧠',
      icon: Smile,
      color: 'bg-amber-100 text-amber-700 border-amber-200',
      keyConcepts: [
        'أنماط التنشئة الوالدية (Diana Baumrind): النمط الديمقراطي الحازم (Authoritative)، المتسلط (Authoritarian)، المتساهل، والمهمل.',
        'فنيات المقابلة الإرشادية مع أولياء الأمور: أسلوب الشطيرة (Sandwich Technique: مدح ثم الملاحظة ثم تشجيع ختامي).',
        'التعامل مع الآباء القلقين والعدوانيين بمهنية عالية دون دفاعية وتوثيق الملاحظات بموضوعية رقمية وحسية.',
        'تعديل السلوك الإيجابي (Positive Discipline): التعزيز الإيجابي، النمذجة (Modeling)، الإطفاء، والنتائج المنطقية بدلاً من العقاب.'
      ],
      lectureTakeaways: [
        {
          title: 'أسلوب السندوتش في تقارير أولياء الأمور',
          desc: 'ابدئي بنقطة قوة حقيقية في الطفل، ثم اطرحي السلوك الذي يحتاج تحسين بهدوء واقتراح مشترك، ثم اختمي بامتنانك لوجوده معك.'
        },
        {
          title: 'النتائج المنطقية (Logical Consequences)',
          desc: 'إذا سكب الطفل الماء على الطاولة عمداً، النتيجة المنطقية هي أن يمسح الماء بإسفنجة بنفسه، وليس حرمانه من اللعب في الحديقة.'
        }
      ],
      examTip: 'سؤال يتكرر: ما هو الفرق بين العقاب والنتيجة المنطقية؟ العقاب يولد الانتقام والخوف، بينما النتيجة ترتبط بالفعل مباشرة وتعلم المسؤولية.',
      interviewQuestion: 'أم غاضبة جاءت تشتكي أن ابنها ضربه زميله، كيف تمتصين غضبها؟ الاستماع النشط دون مقاطعة، إظهار التعاطف مع قلقها، وعرض الإجراء التربوي الوقائي المتخذ بالصف.'
    },
    {
      id: 'math-science-concepts',
      title: 'تنمية المفاهيم الرياضية والعلمية لطفل الروضة (Math & Science Concepts)',
      category: 'curriculum',
      categoryLabel: 'المناهج وطرق التدريس 📋',
      icon: Compass,
      color: 'bg-blue-100 text-blue-700 border-blue-200',
      keyConcepts: [
        'التدرج من المحسوس إلى شبه المحسوس ثم المجرد (Concrete -> Pictorial -> Abstract).',
        'المفاهيم ما قبل العددية: التصنيف (Classification)، المطابقة (Matching)، الترتيب المتسلسل (Seriation)، والنمطية (Patterning).',
        'مفهوم ثبات الكتلة والعدد (Conservation): إدراك أن عدد الأشياء لا يتغير بتغير ترتيبها أو تباعدها في المكان.',
        'دورة الاستقصاء العلمي للأطفال: الملاحظة بالحواس، التوقع والتخمين، التجريب العملي، وتسجيل الملاحظات بالرسم.'
      ],
      lectureTakeaways: [
        {
          title: 'الرمز الرياضي يأتي آخراً',
          desc: 'لا نكتب الرقم (3) للطفل قبل أن يعد 3 تفاحات حقيقية، ثم 3 دوائر مرسومة، ثم يتعرف أخيراً على الرمز المجرد.'
        },
        {
          title: 'التصنيف متعدد الخصائص',
          desc: 'يبدأ الطفل بالتصنيف وفق خاصية واحدة (اللون فقط)، ثم يتطور للتصنيف حسب خاصيتين معاً (الأزرار الحمراء الكبيرة معاً).'
        }
      ],
      examTip: 'مسائل بياجيه في ثبات السوائل والعدد: لماذا يعتقد طفل سن 4 سنوات أن العصير في الكوب الطويل الضيق أكثر من الكوب العريض؟ بسبب التركيز على بعد واحد (Centration).',
      interviewQuestion: 'كيف تشرحين مفهوم الطفو والغرق لطفل الروضة؟ حوض ماء شفاف ومجموعة أشياء من الصف (حجر، إسفنجة، ورقة شجر، مسمار)، وجعل الطفل يجرب ويضع توقعاً قبل الغمر.'
    },
    {
      id: 'art-expression',
      title: 'التربية الفنية والتعبير الإبداعي للطفل (Artistic Expression)',
      category: 'art_skills',
      categoryLabel: 'الفنون والتعبير المسرحي 🎭',
      icon: Palette,
      color: 'bg-purple-100 text-purple-700 border-purple-200',
      keyConcepts: [
        'مراحل التعبير الفني للطفل وفقاً لـ (Viktor Lowenfeld): مرحلة التخطيط العشوائي (Scribbling)، مرحلة تحضير المدرك الشكلي (Preschematic)، ومرحلة المدرك الشكلي (Schematic).',
        'الفن كأداة تشخيصية ونفسية: استخدام الألوان، حجم الأشكال، وضغط القلم ودلالاتها على القلق أو الثقة.',
        'التركيز على العملية الإبداعية وليس الناتج النهائي (Process over Product): تشجيع التجريب بدلاً من نسخ نموذج المعلمة.',
        'الخامات التشكيلية المتنوعة: الصلصال، عجين الملح الطبيعي، ألوان الأصابع النباتية، الكولاج، والطباعة بأوراق الشجر والخضروات.'
      ],
      lectureTakeaways: [
        {
          title: 'خطأ كتب التلوين الجاهزة (Coloring Books)',
          desc: 'التلوين داخل الخطوط الجاهزة يحد من خيال الطفل ويشعره بالعجز إذا خرج عن الخط؛ الأفضل صفحات بيضاء مفتوحة للإبداع الحر.'
        },
        {
          title: 'الشفافية في رسوم الأطفال (X-Ray Drawings)',
          desc: 'رسم الطفل لما يعرفه وليس لما يراه فقط (مثل رسم بطن الأم وبداخله الجنين، أو رسم البيت وتفاصيل الغرف من الخارج).'
        }
      ],
      examTip: 'سؤال شهير: ما هي مظاهر مرحلة المدرك الشكلي في رسم الطفل؟ ظهور خط الأرض (Baseline) وخط السماء، وظاهرة الشفافية والتسطيح.',
      interviewQuestion: 'طفل رسم وحشاً أسود كبيراً جداً، هل هذا بالضرورة مؤشر خطر؟ لا يُحكم من رسمة واحدة؛ يجب سؤاله بحب: "احكِ لي عن رسمتك الجميلة"، وملاحظة سياق ألعابه ومشاعره.'
    }
  ];

  const categories = [
    { id: 'all', label: 'جميع المواد والمقررات (' + courses.length + ')' },
    { id: 'psychology', label: 'علم النفس والنمو 🧠' },
    { id: 'curriculum', label: 'المناهج والتربية الحركية 🏃' },
    { id: 'art_skills', label: 'الموسيقى والفنون والمسرح 🎵' },
    { id: 'health_special', label: 'الصحة والسلامة 🏥' },
  ];

  const filteredCourses = courses.filter((c) => {
    const matchCategory = activeCategory === 'all' || c.category === activeCategory;
    const matchSearch =
      c.title.includes(searchQuery) ||
      c.keyConcepts.some((k) => k.includes(searchQuery)) ||
      c.examTip.includes(searchQuery) ||
      c.interviewQuestion.includes(searchQuery);
    return matchCategory && matchSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-600 text-white p-6 md:p-8 rounded-3xl shadow-lg border-2 border-blue-300/40">
        <div className="inline-flex items-center gap-2 bg-white/20 px-3.5 py-1 rounded-full text-xs font-bold backdrop-blur-xs mb-3">
          <GraduationCap className="w-3.5 h-3.5" />
          <span>المكتبة الأكاديمية الشاملة لكلية التربية للطفولة المبكرة</span>
        </div>
        <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight mb-2">
          موسوعة ومخلصات مواد كلية تربية طفولة مبكرة 🎓📚
        </h2>
        <p className="text-blue-100 text-sm md:text-base max-w-3xl font-medium leading-relaxed">
          مرجعك الأكاديمي الشامل لجميع الفرق الدراسية: يشمل أهم النظريات، المصطلحات، تكات الامتحانات الشفوية والتحريرية، 
          وأسئلة المقابلات الشخصية (Interviews) لوظائف معلمات رياض الأطفال والمدارس الدولية.
        </p>

        {/* Quick Stats Pills */}
        <div className="flex flex-wrap items-center gap-3 mt-4 pt-4 border-t border-blue-400/30 text-xs font-bold">
          <span className="bg-white/20 px-3 py-1 rounded-xl">📖 {courses.length} مقررات دراسية تخصصية</span>
          <span className="bg-white/20 px-3 py-1 rounded-xl">💡 تكات وأسئلة امتحانات متكررة</span>
          <span className="bg-white/20 px-3 py-1 rounded-xl">🎯 أسئلة إنترفيو للمدارس والروضات</span>
        </div>
      </div>

      {/* Search and Category Filter */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-3xl border-2 border-blue-100 shadow-xs">
        {/* Search Input */}
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute right-3.5 top-3.5 text-blue-600" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="ابحثي عن نظرية، مفهوم، أو مادة..."
            className="w-full pl-4 pr-10 py-2.5 rounded-2xl border border-blue-200 focus:border-blue-500 focus:outline-none text-xs md:text-sm font-semibold text-blue-950 placeholder-blue-400 bg-blue-50/20"
          />
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 text-xs font-bold">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3.5 py-2 rounded-xl whitespace-nowrap transition-all cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-blue-600 text-white shadow-xs font-black'
                  : 'bg-blue-50 text-blue-900 hover:bg-blue-100'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Courses Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredCourses.map((course) => {
          const Icon = course.icon;
          return (
            <div
              key={course.id}
              className="bg-white rounded-3xl border-2 border-blue-200 p-6 shadow-md hover:shadow-xl transition-all flex flex-col justify-between space-y-4"
            >
              <div>
                {/* Header row */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`p-3 rounded-2xl border ${course.color} shrink-0`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="text-[11px] font-black text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full inline-block mb-1 border border-blue-200">
                        {course.categoryLabel}
                      </span>
                      <h3 className="font-extrabold text-base md:text-lg text-blue-950 leading-snug">
                        {course.title}
                      </h3>
                    </div>
                  </div>
                </div>

                {/* Key Theoretical Concepts */}
                <div className="space-y-2 mb-4 bg-slate-50/70 p-3.5 rounded-2xl border border-slate-200">
                  <span className="font-black text-xs text-blue-950 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                    <span>المفاهيم والنظريات الأساسية للمقرر:</span>
                  </span>
                  <ul className="space-y-1.5 text-xs text-slate-800 font-medium">
                    {course.keyConcepts.map((con, cIdx) => (
                      <li key={cIdx} className="flex items-start gap-2 leading-relaxed">
                        <span className="text-blue-600 font-bold shrink-0 mt-0.5">•</span>
                        <span>{con}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Lecture Takeaways (Important Definitions) */}
                {course.lectureTakeaways && course.lectureTakeaways.length > 0 && (
                  <div className="space-y-2 mb-4">
                    <span className="font-black text-xs text-slate-900 block">
                      مصطلحات وتعريفات جوهرية بالمحاضرات:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {course.lectureTakeaways.map((take, tIdx) => (
                        <div
                          key={tIdx}
                          className="bg-blue-50/50 p-2.5 rounded-xl border border-blue-100 text-xs"
                        >
                          <span className="font-extrabold text-blue-900 block mb-0.5">
                            📌 {take.title}
                          </span>
                          <p className="text-blue-950/80 leading-relaxed text-[11px] font-semibold">
                            {take.desc}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Bottom Sections: Exam Tip & Interview Q */}
              <div className="space-y-2.5 pt-3 border-t border-blue-100">
                {/* Exam Tip */}
                <div className="bg-amber-50 border border-amber-200 rounded-2xl p-3 text-xs text-amber-950">
                  <span className="font-black text-amber-900 block mb-1 flex items-center gap-1">
                    <Lightbulb className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                    <span>تكة مهمة في الامتحانات (Exam Tip):</span>
                  </span>
                  <p className="font-semibold leading-relaxed text-[11px] sm:text-xs">
                    {course.examTip}
                  </p>
                </div>

                {/* Interview Question */}
                <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-3 text-xs text-emerald-950">
                  <span className="font-black text-emerald-900 block mb-1 flex items-center gap-1">
                    <GraduationCap className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>سؤال متكرر في مقابلات التوظيف (Interview):</span>
                  </span>
                  <p className="font-semibold leading-relaxed text-[11px] sm:text-xs">
                    {course.interviewQuestion}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
