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
    <div className="container-fluid mt-5 px-4">
      <div className="row justify-content-center">
        <div className="col-12 col-lg-10 col-xl-8">
          <h1 className="text-center mb-4">Frequently Asked Questions</h1>

          <div className="accordion" id="faqAccordion">
            {faqs.map((faq, index) => (
              <div key={index} className="accordion-item">
                <h2 className="accordion-header">
                  <button
                    className={`accordion-button ${openIndex === index ? '' : 'collapsed'}`}
                    type="button"
                    onClick={() => toggleAccordion(index)}
                  >
                    {faq.question}
                  </button>
                </h2>
                <div className={`accordion-collapse collapse ${openIndex === index ? 'show' : ''}`}>
                  <div className="accordion-body">
                    {faq.answer}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="alert alert-info mt-4">
            <h5><i className="fas fa-shield-alt me-2"></i>Security Notice</h5>
            <p className="mb-0">
              This application uses strong encryption, but security is only as good as your password choice.
              Use long, complex passwords and never reuse passwords from other services.
              For maximum security, consider using dedicated encryption software for highly sensitive data.
            </p>
          </div>

          <div className="alert alert-warning mt-3">
            <h5><i className="fas fa-exclamation-triangle me-2"></i>Disclaimer</h5>
            <p className="mb-0">
              This tool is provided "as is" for convenience. While we implement industry-standard security practices,
              we cannot guarantee protection against all possible attacks. Users are responsible for their own security practices.
              Do not use this for illegal activities. The developers are not liable for any data loss or security breaches.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;