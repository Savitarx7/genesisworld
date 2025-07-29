export default function ControlsSystem(entities, { touches }) {
  const move = touches.find(x => x.type === 'move');
  return entities;
}
