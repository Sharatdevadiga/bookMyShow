export default function smoothScrollTo(elementId, time) {
  const targetElement = document.getElementById(elementId);
  if (!targetElement) return;

  // Correct calculation of the target position to be absolute from the document's top
  const scrollTop =
    document.documentElement.scrollTop || document.body.scrollTop;
  const targetPosition = targetElement.getBoundingClientRect().top + scrollTop;
  const startPosition = scrollTop;
  const distance = targetPosition - startPosition;
  const duration = time; // Duration in ms
  let startTime = null;

  function animation(currentTime) {
    if (startTime === null) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const nextScrollY = easeInOutQuad(
      timeElapsed,
      startPosition,
      distance,
      duration
    );
    window.scrollTo(0, nextScrollY);
    if (timeElapsed < duration) requestAnimationFrame(animation);
  }

  function easeInOutQuad(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return (c / 2) * t * t + b;
    t--;
    return (-c / 2) * (t * (t - 2) - 1) + b;
  }

  requestAnimationFrame(animation);
}
