import React from "react";
import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/24/outline";

const FAQ: React.FC = () => {
  const faqData = [
    {
      question: 'How do I book an appointment?',
      answer:
        'To book an appointment, simply search for a doctor based on specialty, date ,time or availability. Once you find a doctor, select a time slot that suits you and confirm the booking. You will receive a confirmation email with all the details.',
    },
    {
      question: 'Is there a fee for booking through the platform?',
      answer:
        'Yes, there is a fee for the paitents who book the appointment . we give priority to both paitents and doctors . ',
    },
    {
      question: 'How do I create an account?',
      answer:
        'Creating an account is simple. Click on the "Sign Up" button, fill in the required information, and follow the prompts. Once you verify your email, your account will be activated.',
    },
    
    {
        question: 'Do I get unlimited SMS?',
        answer:
          'Yes. Unlimited Chat are available once you get the appointment . ',
      },
      {
        question: 'What if I need to contact customer support?',
        answer:
          'If you need to contact customer support, you can use the "Contact Us" form on our website or email us at support@quickdoc.com. Our team is available 24/7 to assist you with any questions or concerns.',
      },
      {
        question: 'What is the QuickDoc Patient Engagement Platform?',
        answer:
          'QuickDoc’s mission is to improve the healthcare experience for everyone in India and align this with better patient outcomes. Our platform has been designed with this in mind to allow practitioners to better communicate with patients, and for patients to have easier access to their providers whilst supporting continuity of care.',
      },
      {
        question: 'What is the QuickDoc Company promise?',
        answer:
          'HotDoc is committed to supporting continuity of care, to encourage better patient outcomes. You can read more about this "About us" page .',
      },
  ];

  return (
    <div className="w-full flex flex-col items-center">
      <section className="bg-white py-8 px-4 sm:px-6 lg:px-8 w-full max-w-[70%]">
        <h2 className="text-4xl font-semibold text-gray-800 mb-4 text-center">FAQs </h2>
        <div className="space-y-2">
          {faqData.map((faq, index) => (
            <Disclosure key={index} as="div" className="border-b">
              {({ open }) => (
                <>
                  <Disclosure.Button
                    className={`flex justify-between items-center w-full px-4 py-4 text-left text-xl font-medium text-gray-800 hover:bg-gray-100 focus:outline-none focus-visible:ring focus-visible:ring-gray-500 focus-visible:ring-opacity-75`}
                  >
                    <span>{faq.question}</span>
                    <ChevronUpIcon
                      className={`${
                        open ? "transform rotate-180" : ""
                      } w-5 h-5 text-gray-900`}
                    />
                  </Disclosure.Button>
                  <Disclosure.Panel className="px-4 py-2 text-gray-700 text-md">
                    {faq.answer}
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>
          ))}
        </div>
      </section>
    </div>
  );
};

export default FAQ;
