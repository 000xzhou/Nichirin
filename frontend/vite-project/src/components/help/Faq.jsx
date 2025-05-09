import Dropdown from "../Dropdown";
import "./faq.css";

// temp db
const faq = [
  {
    question: "How to order?",
    answer: "Go to the shop page and click 'Add to Cart'.",
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept credit card, PayPal, and Apple Pay.",
  },
  {
    question: "What if I dislike like the product?",
    answer: "Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
  },
  {
    question: "Do you like cats?",
    answer: "Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
  },
  {
    question: "I did not look for sample questions.",
    answer: "Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
  },
];

function Faq() {
  return (
    <div className="container">
      <h1>FAQ</h1>
      <div className="question-wrapper">
        {faq.map((item) => (
          <Dropdown label={item.question} key={item.question}>
            <div className="dropdown-item">{item.answer}</div>
          </Dropdown>
        ))}
      </div>
    </div>
  );
}

export default Faq;
