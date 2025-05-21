import React, { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Homepage from './pages/Homepage'
import Sidebar from './component/Sidebar'

function App() {
  const [sidebarWidth, setSidebarWidth] = useState('250px');
  const [isResizing, setIsResizing] = useState(false);

  function handleResize(e) {
    if (!isResizing) return;
    if (e.clientX > 250) {
      setSidebarWidth('250px');
      return;
    }
    if (e.clientX < 70) {
      setSidebarWidth('70px');
      return;
    }

    setSidebarWidth(`${e.clientX}px`);
  }

  function stopResize() {
    setIsResizing(false);
    document.body.style.cursor = 'default';
  }

  function activateResize() {
    setIsResizing(true);
    document.body.style.cursor = 'col-resize';
  }

  return (
    <>
      <div
        onMouseMove={handleResize}
        onMouseUp={stopResize}
        onMouseDown={activateResize}
        className="h-screen w-screen flex"
      >
        
        {/* Sidebar */}
        <Sidebar sidebarWidth={sidebarWidth} />

        {/* Main Content */}
        <div
          className="bg-gray-900 text-white overflow-auto"
          style={{ width: `calc(100vw - ${sidebarWidth})`, marginLeft: sidebarWidth }}
        >

          <Routes>
            <Route path="/" element={<Homepage />} />
            {/* <Route path="/pdf" element={<PDFViewer />} /> */}
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
