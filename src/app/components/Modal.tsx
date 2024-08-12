import React from "react";
import FocusLock from "react-focus-lock";
import { RemoveScroll } from "react-remove-scroll";

const ICONS = {
  0: "🟨",
  1: "🟩",
  2: "🟦",
  3: "🟪",
} as const;

const COLORS = {
  0: '#F7DC6F',
  1: '#82E0AA',
  2: '#85C1E9',
  3: '#BB8FCE',
} as const

export default function Modal({ isModalOpen, setIsModalOpen, puzzleId, results }: { isModalOpen: boolean, setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>, puzzleId: string, results: number[][] }) {
  return (
    <FocusLock>
      <RemoveScroll>
          <ModalWrapper className="fixed inset-0 grid place-content-center p-10 z-[999]">
            <ModalBackdrop isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} className="absolute inset-0 bg-black opacity-75"/>
            {/* <ModalBackdrop className="pointer-events-none absolute inset-0 bg-black opacity-50" /> */}
            <ModalContentWrapper className="relative bg-white rounded-lg p-10">
              <ModalContent className="flex flex-col justify-center gap-4">
                <h1 className='text-lg font-medium'>Connection #{puzzleId}</h1>
                <div className="flex flex-col gap-1">
                  {results.map((resultArray, index) => (
                    <div key={`result-line-${index}`} className="flex gap-1">
                      {resultArray.map((result, index) => (
                        <span 
                          key={`result-item-${index * index}`}
                          style={{backgroundColor: COLORS[result as keyof typeof ICONS]}} 
                          className='h-10 w-10 rounded-lg'></span>
                      ))}
                    </div>
                  ))}
                </div>
                <button onClick={() => console.log('click')}className='px-4 py-2 border border-solid border-obsidian rounded-full'>Share</button>
                <ShareButton results={results} />
              </ModalContent>
            </ModalContentWrapper>
          </ModalWrapper>
      </RemoveScroll>
    </FocusLock>
  );
}

function ModalWrapper({
  className,
  children,
}: {
  className: string;
  children: React.ReactNode;
}) {
  return <div className={className}>{children}</div>;
}
function ModalBackdrop({ isModalOpen, setIsModalOpen, className }: { isModalOpen: boolean, setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>, className: string }) {
  return <div onClick={() => setIsModalOpen(!isModalOpen)} className={className} />;
}
function ModalContentWrapper({
  className,
  children,
}: {
  className: string;
  children: React.ReactNode;
}) {
  return <div className={className}>{children}</div>;
}
function ModalContent({
  className,
  children,
}: {
  className: string;
  children: React.ReactNode;
}) {
  return <div className={className}>{children}</div>;
}

function ShareButton({ results }: { results: number[][]}) {
  
  async function handleShare() {
    console.log('handling share')
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Game Results',
          text: `Here are my results: ${results.join(', ')}`,
          url: window.location.href,
        });
        console.log('Share successful');
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      console.error('Web Share API not supported in this browser');
    }
  };
  
  
  return (
    <button onClick={handleShare}>Share Results</button>
  );
} 
