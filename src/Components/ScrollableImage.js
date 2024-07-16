import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, {
  Defs,
  ClipPath,
  Polygon as SPolygon,
  Image,
} from 'react-native-svg';
import SvgPanZoom, { SvgPanZoomElement } from 'react-native-svg-pan-zoom';

export default function ScrollableImage({ width, height, points, image }) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [initialTouch, setInitialTouch] = useState({ x: 0, y: 0 });

  const handleDragStart = (e) => {
    const { locationX, locationY } = e.nativeEvent;
    setInitialTouch({ x: locationX, y: locationY });
    setDragging(true);
  };

  const handleDragMove = (e) => {
    if (!dragging) return;
    const { locationX, locationY } = e.nativeEvent;
    const deltaX = locationX - initialTouch.x;
    const deltaY = locationY - initialTouch.y;

    setPosition((prevPosition) => ({
      x: prevPosition.x + deltaX,
      y: prevPosition.y + deltaY,
    }));

    setInitialTouch({ x: locationX, y: locationY });
  };

  const handleDragEnd = () => {
    setDragging(false);
  };

  return (
    <Svg height={height} width={width}>
      <Defs>
        <ClipPath id="clip">
          <SPolygon points={points} stroke="red" strokeWidth="4"/>
        </ClipPath>
      </Defs>
      <SPolygon points={points} stroke="purple" strokeWidth="1"  onResponderMove={()=>{console.log('cd');}} />
      <SvgPanZoomElement
        onClick={handleDragStart}
        onDrag={handleDragMove}
        onClickRelease={handleDragEnd}
        
      >
        <Image
          width="100%"
          height="100%"
          x={position.x}
          rotation={0}
          y={position.y}
          onResponderMove={()=>{console.log('cd');}}
          href={image}
          clipPath="url(#clip)"
        />
      </SvgPanZoomElement>
    </Svg>
  );
}

const styles = StyleSheet.create({
  // Add styles if needed
});
