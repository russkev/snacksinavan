/* Gets the remaining time for the user to change/cancel the inputted order
  and returns it in hh:mm:ss form */
export default function orderTimeLeft(order, timeLimit, allowNegative) {
  // Allows us to use the state and effect calls before we get the order from
  // the database to avoid errors
  if (!order) {
    return null;
  }

  const currentTimeLeft = timeLeft(order.updatedAt, timeLimit)

  if (currentTimeLeft.multiplier < 0 && !allowNegative) {
    return 0
  } else {
    const negativeSign = currentTimeLeft.multiplier < 0 ? "-" : ""
    return `${negativeSign}${currentTimeLeft.hours}:`
      + `${currentTimeLeft.minutes.toString().padStart(2, "0")}:` 
      + `${currentTimeLeft.seconds.toString().padStart(2, "0")}` 
  }
}

export function timePassedSeconds(timeStamp) {
  const createdAt = new Date(timeStamp).getTime();
  const currentTime = new Date().getTime();
  const timePassedMillis = currentTime - createdAt;
  return Math.floor(timePassedMillis / 1000);
}

export function timeLeft(timeStamp, timeLimit) {

  const secondsLeft = timeLimit * 60 -  timePassedSeconds(timeStamp)

  const multiplier = secondsLeft < 0 ? -1 : 1
  const currentTimeLeft = {
    seconds: (multiplier * secondsLeft % 60),
    minutes: Math.floor((multiplier * secondsLeft % 3600)/60),
    hours: Math.floor(multiplier * secondsLeft / 3600),
    multiplier: multiplier
  }
  return currentTimeLeft
}