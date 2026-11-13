// Array of enthusiastic, culturally relatable superhero motivational messages for children
export const MOTIVATIONAL_MESSAGES = [
  'عاش يا بطل الأبطال! إنجاز خارق وممتاز! 🦸‍♂️⚡',
  'الله عليك يا بطل! نجمة جديدة بتلمع في طريقك لأحلى هدية! ⭐🌟',
  'تسلم إيدك يا بطل! فخورين بيك وبشطارتك وسرعتك! 👏🎉',
  'برافو يا أسطورة! خطوة خارقة ومهمة تمت بنجاح! 🚀💪',
  'وحش المهام! قوة خارقة وعزيمة حديدية! 🥇✨',
  'يا عيني عليك يا بطل! استمر كدا دا أنت مفيش زيك أبداً! 💖🥳',
  'إنجاز أسطوري! كل مهمة بتعملها بتقربك من هديتك المميزة! 🎁⭐',
  'شطارة ملهاش حدود! بطلك الخارق بيسقفلك وفرحان بيك جداً! 🎈🦸‍♀️',
  'عاش البطل الهمام! يلا على التحدي اللي بعده! 🔥🏆',
  'أنت فخر العيلة وبطل اليوم الحقيقي! استمر يا بطل! 🌟👑',
  'يا سلام عليك! طاقة أبطال متجددة لا تتوقف أبداً! ⚡🎯',
  'كفو يا بطل! رفعت راسنا بإنجازك الرائع والمنظم! 🦾🌟',
  'سوبر هيرو حقيقي! النجوم الذهبية تليق بيك وبشطارتك! ⭐🎊',
  'ما شاء الله على الشطارة والالتزام العالي! كمل يا بطل! 🌈💖',
  'أنت بطل تقدر على أي تحدي! شجاعة وإتقان ولا أروع! 🦁💪',
  'سرعة البرق وطاقة النجوم اجتمعوا فيك! مبروك النجمة! ⚡⭐',
];

/**
 * Returns a random motivational message, optionally customized with child's name
 */
export function getRandomMotivationalMessage(childName?: string): string {
  const index = Math.floor(Math.random() * MOTIVATIONAL_MESSAGES.length);
  const baseMessage = MOTIVATIONAL_MESSAGES[index];

  if (!childName || !childName.trim()) {
    return baseMessage;
  }

  const name = childName.trim();
  // Customize message with child's name
  return baseMessage.replace('يا بطل الأبطال', `يا ${name} يا بطل الأبطال`)
                    .replace('يا بطل!', `يا ${name}!`)
                    .replace('يا بطل ', `يا ${name} `)
                    .replace('البطل الهمام', `البطل ${name}`);
}
