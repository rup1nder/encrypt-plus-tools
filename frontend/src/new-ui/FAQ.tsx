import React, { useState } from 'react';

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "Is my data secure?",
      answer: "Yes! We use RSA 2048-bit asymmetric encryption, which is military-grade security. Your messages are encrypted on your device and can only be decrypted with the password you provide. We never store your passwords or plaintext messages."
    },
    {
      question: "Do you store my personal information?",
      answer: "No! This application does not require user accounts or store any personal information. We only temporarily store encrypted keys (not passwords or messages) for 3 days to enable decryption, after which they are automatically deleted."
    },
    {
      question: "How does the encryption work?",
      answer: "When you encrypt a message: 1) We generate a unique RSA key pair for your message, 2) Your message is encrypted with the public key, 3) The private key is encrypted with your password, 4) You get the encrypted message + a reference ID. For decryption, you provide the encrypted message, ID, and password to unlock your original text."
    },
    {
      question: "Is the code open source?",
      answer: "Yes! The complete source code is available on GitHub. You can review the encryption implementation, security measures, and infrastructure setup. This transparency ensures you can verify the security of your data."
    },
    {
      question: "What happens to my encrypted data?",
      answer: "We do NOT store your encrypted messages or plaintext data. You receive the encrypted data immediately and should save it locally. We only temporarily store the decryption key (encrypted with your password) for 3 days to enable decryption. After that, the key is automatically deleted. Without the key, your data remains secure but cannot be decrypted."
    },
    {
      question: "Can I use this for sensitive information?",
      answer: "While we use industry-standard encryption, this is a utility tool. For highly sensitive information, consider additional security measures like using your own encryption tools or consulting security professionals. Always use strong, unique passwords and never share them."
    },
    {
      question: "What if I forget my password?",
      answer: "Unfortunately, if you forget your password, your encrypted message cannot be recovered. This is by design for security - even we cannot access your data without the password. Always use passwords you can remember or store securely."
    },
    {
      question: "Is this free to use?",
      answer: "Yes! This is a free utility. We may have minimal AWS hosting costs, but there are no usage fees or premium features. The service is supported by open-source contributions."
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl mb-4 shadow-lg">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h2 className="text-4xl font-bold text-white mb-4">
          <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Frequently Asked Questions
          </span>
        </h2>
        <p className="text-xl text-gray-200 max-w-2xl mx-auto">
          Everything you need to know about our encryption service
        </p>
      </div>

      <div className="space-y-4 mb-8">
        {faqs.map((faq, index) => (
          <div key={index} className="glass">
            <button
              onClick={() => toggleAccordion(index)}
              className="w-full p-6 text-left flex items-center justify-between hover:bg-white/5 transition-all duration-300"
            >
              <h3 className="text-lg font-semibold text-white pr-4">
                {faq.question}
              </h3>
              <div className={`transform transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`}>
                <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </button>
            
            <div className={`overflow-hidden transition-all duration-500 ease-in-out ${openIndex === index ? 'max-h-96' : 'max-h-0'}`}>
              <div className="p-6 pt-0">
                <p className="text-gray-300 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="glass p-6">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center mr-4">
              <svg className="w-6 h-6 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"/>
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white">Security Notice</h3>
          </div>
          <p className="text-gray-300 leading-relaxed">
            This application uses strong encryption, but security is only as good as your password choice.
            Use long, complex passwords and never reuse passwords from other services.
            For maximum security, consider using dedicated encryption software for highly sensitive data.
          </p>
        </div>

        <div className="glass p-6">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-yellow-500/20 rounded-full flex items-center justify-center mr-4">
              <svg className="w-6 h-6 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"/>
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white">Disclaimer</h3>
          </div>
          <p className="text-gray-300 leading-relaxed">
            This tool is provided "as is" for convenience. While we implement industry-standard security practices,
            we cannot guarantee protection against all possible attacks. Users are responsible for their own security practices.
            Do not use this for illegal activities. The developers are not liable for any data loss or security breaches.
          </p>
        </div>
      </div>
    </div>
  );
};

export default FAQ;