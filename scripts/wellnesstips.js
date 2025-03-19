function getWellnessTip () {
  const tips = [
  
   "Drink plenty of water thoughout the day to stay hydrated.",
   "Start your day with a healthy breakfast to boost your energy levels", 
   "Practice mindfulness for 5-10 minutes every morning to reduce stress.",
   "Incorporate more fruits and vegatables into your diet for better health",
   "Get at least 30 minutes of physical actvity each day.",
   "Make sure you're getting 7-8 hours of sleep every night for optimal health",
   "Take breaks thought the day to stretch and recharge your energy"
  ];

 
  const randomTip = () => {
   const randomIndex = Math.floor(Math.random() *
  randomTips.length);
return tips[randomIndex] ;
  };
  


  
   


}

export default getWellnessTip;
