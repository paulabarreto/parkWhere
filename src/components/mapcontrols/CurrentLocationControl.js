const CurrentLocationControl = (controlDiv) => {
  controlDiv.style.borderRadius = '3px';
  controlDiv.style.cursor = 'pointer';
  controlDiv.style.backgroundImage = "url('gps-location.png')";
  controlDiv.style.backgroundSize = 'cover';
  controlDiv.style.backgroundRepeat = 'no-repeat';
  controlDiv.style.marginRight = '20px';
  controlDiv.style.marginBottom = '10px';
  controlDiv.style.textAlign = 'center';
  controlDiv.style.height = '50px';
  controlDiv.style.width = '50px';
}

export default CurrentLocationControl;