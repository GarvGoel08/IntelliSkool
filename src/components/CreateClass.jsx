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
                        <input placeholder='Classroom Title' className="border border-gray-300 px-4 py-2 rounded-md outline-none" />
                        <input placeholder='Classroom Description' className="border border-gray-300 px-4 py-2 rounded-md outline-none" />
                        <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition">
                            Save
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default CreateClass;
