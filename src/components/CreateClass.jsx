import Header from '../components/Header'
import Classroom from './Classroom';
import { useState } from 'react';

function CreateClass() {
    const [showCreateForm, setShowCreateForm] = useState(false);

    return (
        <div className='bg-white w-[100vw] h-[100vh] absolute top-0 left-0 text-black'>
            <Header />
            <div className='pt-[100px] px-4'>
                <div className='border border-gray-300 rounded-xl h-[85vh] flex flex-col'>

                    {/* Header */}
                    <div onClick={() => setShowCreateForm(false)} className='flex items-center h-[60px] px-2 py-2 text-xl font-semibold border-b border-gray-300'>
                        My Classes
                    </div>

                    {/* Content */}
                    <div className={`transition-all duration-500 overflow-hidden ${showCreateForm ? 'h-0 opacity-0' : 'flex-grow h-[calc(100vh - 120px)] opacity-100 p-4'}`}>
                        <Classroom data="Hello" />
                    </div>

                    {/* Bottom action */}
                    <div
                        onClick={() => setShowCreateForm(true)}
                        className={`transition-all duration-500 overflow-hidden items-center py-4 px-2 border-t text-xl font-semibold cursor-pointer border-gray-300 ${showCreateForm ? 'h-[calc(100vh-120px)] opacity-100 p-4' : 'h-[60px] opacity-100 p-4'}`}
                    >
                        <p className='cursor-pointer'>Create Classroom</p><br />
                        <div className='flex flex-col w-[450px]'>
                            <input
                                placeholder='Classroom Title'
                                className="border-b-2 border-[#2E3A59] focus:border-blue-500 px-4 py-2 outline-none transition-colors duration-200"
                            /><br />
                            <textarea
                                placeholder='Classroom Description'
                                className="border overflow-auto h-[150px] border-[#2E3A59] focus:border-blue-500 px-2 py-2 outline-none transition-colors duration-200 resize-none" style={{
                                    scrollbarWidth: 'none',  /* Firefox */
                                    msOverflowStyle: 'none'  /* Internet Explorer */
                                }}
                            /><br />
                            <div className="bg-blue-0 border flex items-center justify-center text-[#2E3A59] px-4 rounded-xl py-2 w-[100px] hover:bg-[#2E3A59] hover:text-white transition-colors duration-200">
                                Save
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default CreateClass;
