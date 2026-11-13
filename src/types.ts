export type AcademicTab = 
  | 'lesson_plans'      // تحضير الأنشطة والدروس
  | 'behavior_guide'    // دليل تعديل السلوك والمشكلات السلوكية
  | 'teaching_aids'     // بنك الوسائل التعليمية المبتكرة
  | 'puppet_theatre'    // اسكريبتات مسرح العرائس والقصص
  | 'rubrics_eval'      // استمارات ملاحظة وتقييم نمو الطفل
  | 'study_summaries';  // ملخصات ومفاهيم مواد الكلية

export type ActivityAgeGroup = '3-4' | '4-5' | '5-6';

export type ActivityDomain = 
  | 'linguistic'    // لغوي
  | 'mathematical'  // رياضي / منطقي
  | 'scientific'    // علمي واستكشافي
  | 'artistic'      // فني وموسيقي
  | 'motor'         // حركي / بدني
  | 'social_emotional'; // اجتماعي ووجداني

export interface LessonPlan {
  id: string;
  title: string;
  unit: string;
  ageGroup: ActivityAgeGroup;
  domain: ActivityDomain;
  durationMinutes: number;
  behavioralObjectives: {
    cognitive: string[]; // معرفي
    psychomotor: string[]; // حركي / نفسي حركي
    affective: string[]; // وجداني
  };
  teachingAids: string[];
  introduction: string; // التهيئة ومثير الانتباه
  steps: string[]; // خطوات تنفيذ النشاط
  closing: string; // الغلق والتقويم
  safetyNotes?: string;
  tags: string[];
}

export interface BehaviorStrategy {
  id: string;
  problemTitle: string; // مثلاً: قلق الانفصال، العناد، العض، الخجل
  ageCommon: string;
  underlyingCauses: string[]; // الأسباب النفسية والدوافع
  doList: string[]; // ماذا تفعل المعلمة؟
  dontList: string[]; // احذري أن تفعلي!
  storyIdea: string; // فكرة قصة علاجية قصيرة
  cooperationWithFamily: string; // إرشاد ولي الأمر
}

export interface TeachingAid {
  id: string;
  title: string;
  concept: string; // المفهوم الرياضي أو العلمي
  materialsNeeded: string[]; // خامات بيئية بسيطة
  howToMake: string[]; // طريقة الصنع خطوة بخطوة
  howToUseInClass: string; // طريقة توظيفها في الركن
  recyclableFriendly: boolean;
  learningCorner: 'math' | 'reading' | 'science' | 'art' | 'dramatic_play';
}

export interface PuppetScript {
  id: string;
  title: string;
  targetValue: string; // القيمة المستهدفة (الصدق، النظافة، المشاركة...)
  characters: { name: string; puppetType: string; role: string }[];
  dialogueLines: { speaker: string; text: string; emotion: string }[];
  durationMinutes: number;
}

export interface DevelopmentalMilestone {
  domain: string;
  milestones: string[];
  evaluationCriterion: string;
}

export type CharacterId = 'bondok' | 'basbousa' | 'ammi_felfel' | 'robot';

export interface CartoonCharacter {
  id: CharacterId;
  name: string;
  nameEn: string;
  nickname: string;
  avatar: string;
  color: string;
  textColor: string;
  borderColor: string;
  description: string;
  catchphrase: string;
  favoriteFood: string;
  favoriteToy: string;
  phrases: string[];
}

export interface SceneDialogue {
  id: string;
  characterId: CharacterId | 'narrator';
  characterName: string;
  text: string;
  emotion: 'happy' | 'excited' | 'funny' | 'shocked' | 'thinking' | 'hungry' | 'proud';
  soundEffect?: 'boing' | 'pop' | 'splat' | 'giggle' | 'whistle' | 'celebrate';
}

export interface SceneChoiceOption {
  id: string;
  text: string;
  reactionText: string;
  characterReactionId: CharacterId;
  soundEffect?: 'boing' | 'pop' | 'celebrate' | 'whistle' | 'splat' | 'giggle';
}

export interface SceneChoice {
  prompt: string;
  helperText?: string;
  options: SceneChoiceOption[];
}

export interface CartoonScene {
  id: string;
  title: string;
  bgType: 'street' | 'kitchen' | 'playpark' | 'invention_lab';
  dialogues: SceneDialogue[];
  choice?: SceneChoice;
  interactiveGame?: 'icecream' | 'tree_reveal';
  tip?: string;
}

export interface CartoonEpisode {
  id: string;
  number: number;
  title: string;
  subtitle: string;
  coverImage: string;
  badge: string;
  synopsis: string;
  durationText: string;
  starsReward: number;
  scenes: CartoonScene[];
}

export interface SoundboardItem {
  id: string;
  characterId: CharacterId;
  title: string;
  quote: string;
  emoji: string;
  color: string;
}

export interface Hero {
  id: string;
  name: string;
  title: string;
  image: string;
  color: string;
  glowColor: string;
  badge: string;
  powerDescription: string;
}

export interface Task {
  id: string;
  title: string;
  subtitle?: string;
  icon: string;
  color: string;
  textColor: string;
  category: 'daily' | 'extra';
  completed: boolean;
  completedAt?: string;
}

export interface Reward {
  id: string;
  title: string;
  icon: string;
  cost: number;
  redeemedCount: number;
  isCustom?: boolean;
  customRequestId?: string;
  isPurchasableFromStore?: boolean;
  priceEGP?: number;
  shippingDays?: string;
  storeDescription?: string;
}

export interface CustomRewardRequest {
  id: string;
  title: string;
  icon: string;
  proposedCost: number;
  approvedCost?: number;
  childMessage?: string;
  childName?: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
  reviewedAt?: string;
}

export interface ParentChildProfile {
  parentName: string;
  parentContact?: string;
  childFirstName: string;
  childSecondName?: string;
  city?: string;
  postalAddress?: string;
  registeredAt: string;
}

export interface GiftOrder {
  id: string;
  orderNumber: string;
  rewardId: string;
  rewardTitle: string;
  rewardIcon: string;
  starsUsed: number;
  priceEGP: number;
  shippingFeeEGP: number;
  totalPriceEGP: number;
  childFirstName: string;
  childSecondName?: string;
  parentName: string;
  phone: string;
  city: string;
  postalAddress: string;
  postalCode?: string;
  paymentMethod: 'cod' | 'wallet' | 'instapay';
  notes?: string;
  status: 'pending' | 'shipped' | 'delivered';
  createdAt: string;
}

