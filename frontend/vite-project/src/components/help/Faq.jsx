function Faq() {
  const showAnswer = () => {
    //show answer
  };
  return (
    <>
      <h1>FAQ</h1>
      <div className="max-700">
        <div>
          <div className="dropdown" onClick={showAnswer}>
            How to order?
          </div>
          <div className="dropdown-content">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sint
            praesentium enim rem repudiandae facilis minima velit suscipit
            repellendus doloribus magnam.
          </div>
        </div>
        <div>
          <div>What if I dislike like the product?</div>
          <div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate,
            sapiente?
          </div>
        </div>
        <div>
          <div>Do you like cats?</div>
          <div>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ratione
            voluptatem unde vitae recusandae saepe eius.
          </div>
        </div>
        <div>
          <div>I did not look for sample questions.</div>
          <div>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ratione
            voluptatem unde vitae recusandae saepe eius.
          </div>
        </div>
      </div>
    </>
  );
}

export default Faq;
