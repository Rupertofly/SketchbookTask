import { ReactElement, useState } from 'react';

interface Props {
  images: { name: string; data: ImageData }[];
  selectedImage: string;
}

function SideBar({}: Props): ReactElement {
  return <div>Blah</div>;
}

export default SideBar;
