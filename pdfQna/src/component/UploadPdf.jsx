/* import React from 'react'

function UploadPdf() {
    const [fileName, setFileName] = React.useState(null);



    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setFileName(file.name);
        } else {
            setFileName("No file chosen");
        }

    }



    return (
        <div className='flex flex-col items-center justify-center w-1/2 h-4/5 p-10 rounded-2xl  shadow-[0px_0px_50px] border-2 border-white/5 shadow-blue-950/80  '>
            <div className='  flex flex-col items-center justify-center border-dotted border-2 border-blue-500/80 rounded-lg w-full h-full p-10'>
                <label className="flex items-center gap-2 cursor-pointer bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md">
                    <span>Upload PDF</span>
                    <input
                        type="file"
                        accept="application/pdf"
                        className="hidden"
                        onChange={handleFileChange}
                    />
                    <p>{fileName}</p>
                </label>
            </div>
        </div>
    )
}

export default UploadPdf */



const UploadPdf = ({ onFileUpload }) => {
    return (
        <div className="bg-gray-900 p-6 rounded-md shadow-md">
            <input
                type="file"
                accept="application/pdf"
                onChange={onFileUpload}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4
                file:rounded-md file:border-0 file:text-sm file:font-semibold
                file:bg-blue-500 file:text-white hover:file:bg-blue-600"
            />
        </div>
    )
}

export default UploadPdf
