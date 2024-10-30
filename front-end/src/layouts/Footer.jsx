import React from "react"


const Footer = () => {
  return (
   <footer>
                    <div className="box">
                        <button className="add-file">
                            <img src="images/plus.png" />
                        </button>
                        <input
                            type="text"
                            id="message"
                            placeholder="Type A Message..."
                        />
                        <button className="send">
                            <img src="images/send.png" />
                        </button>
                    </div>
                </footer>
  )
}

export default Footer