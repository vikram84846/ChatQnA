import React from 'react'
import { MdOutlineFileUpload } from 'react-icons/md'
import { FaFile } from 'react-icons/fa'
import { BiLogoOkRu } from 'react-icons/bi'

function Sidebar({ sidebarWidth }) {
    let collapsed = parseInt(sidebarWidth) < 200;
    function log(){
        console.log(sidebarWidth);
        
    }

    return (
        <div
            style={{ width: sidebarWidth }}
            className="h-screen bg-gray-900 fixed top-0 left-0 text-white flex flex-col justify-between p-4 shadow-lg border-r-2 border-gray-100/5 "
            onClick={log}
        >
            <div>
                <div className="flex items-center gap-3 mb-10 cursor-pointer">
                    <BiLogoOkRu size={40} />
                    {!collapsed && (
                        <h1 className="text-xl font-bold text-blue-500">PDFUploader</h1>
                    )}
                </div>

                <label className="flex items-center gap-2 cursor-pointer w-full bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-md">
                    <MdOutlineFileUpload size={30} />
                    {!collapsed && <span>Upload PDF</span>}
                    <input
                        type="file"
                        accept="application/pdf"
                        className="hidden"
                    />
                </label>
            </div>

            <div>
                <button className="flex items-center gap-2 w-full cursor-pointer bg-gray-800 hover:bg-gray-700 text-white p-2 rounded-md">
                    <FaFile size={20} />
                    {!collapsed && <span>Docs</span>}
                </button>
            </div>
        </div>
    );
}

export default Sidebar;
