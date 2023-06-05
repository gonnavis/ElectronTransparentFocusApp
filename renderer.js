// Access the `toggleIgnoreMouseEvents` function from the Electron API
const { enableIgnoreMouseEvents, disableIgnoreMouseEvents } = window.electronAPI;

const button = document.querySelector('button');
const div = document.querySelector('div');
button.addEventListener('click', () => {
  // set document body background color to random color
  // document.body.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 75%)`;
  // document.body.style.backgroundColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  
  // create a new div and add to body with text content
  const newDiv = document.createElement('div');
  newDiv.textContent = 'Hello World';
  document.body.appendChild(newDiv);
})
button.addEventListener('mouseenter', () => {
  div.textContent = 'Mouse entered';
  disableIgnoreMouseEvents();
})
button.addEventListener('mouseleave', () => {
  div.textContent = 'Mouse left';
  enableIgnoreMouseEvents();
})