import { useState } from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";
import { postDataAuth } from "@/service/apiCalls/Fetcher";
import PaymentProvider from "./PaymentProvider";

const PurchaseTimeModal = ({ onValueChange, t }) => {
  const [isPayOpen, setIsPayOpen] = useState(false);
  const [isInnerOpen, setIsInnerOpen] = useState(true);
  const [paymentType, setPaymentType] = useState("Type1");

  const purchaseType1 = async (Type) => {
    setPaymentType(Type);
    setIsPayOpen(true);
    setIsInnerOpen(false);
  };

  const value = false;
  const closeModal = () => {
    onValueChange(value);
  };

  return (
    <>
      {isInnerOpen && (
        <div className=" border-b-2 py-2 md:border-0">
          <div className="modal-overlay">
            <div className="relative contain-modal-content rounded-lg">
              <div
                className="modal-content pd-sm bg-white pt-4 rounded-lg overflow-scroll"
                style={{ height: "75%" }}
              >
                <div className=" bg-white rounded-lg text-center">
                  <h4 className="modal-header">{t("top")}</h4>
                  <p>{t("sub")}.</p>

                  <button
                    className="sub-class mb-3"
                    onClick={() => purchaseType1("Type1")}
                  >
                    <Image
                      src="/asset/green-mark.png"
                      title="approved icons"
                      height={24}
                      width={24}
                      className="mr-3 sub-icon"
                      alt="A marker icon"
                    />
                    <p className="mr-auto">10 {t("minute")}</p>
                    <p>17 USD</p>
                  </button>
                  <button
                    className="sub-class mb-3 sub-class-special"
                    onClick={() => purchaseType1("Type2")}
                  >
                    <Image
                      src="/asset/green-mark.png"
                      title="approved icons"
                      height={24}
                      width={24}
                      className="mr-3  sub-icon"
                      alt="A marker icon"
                    />
                    <p className="mr-auto border-pink">30 {t("minute")}</p>
                    <p>50 USD</p>
                  </button>
                  <button
                    className="sub-class mb-3"
                    onClick={() => purchaseType1("Type3")}
                  >
                    <Image
                      src="/asset/green-mark.png"
                      title="approved icons"
                      height={24}
                      width={24}
                      className="mr-3 sub-icon"
                      alt="A marker icon"
                    />
                    <p className="mr-auto">60 {t("minute")}</p>
                    <p>100 USD</p>
                  </button>
                  <p className="text-xl text-black">Let&apos;s Encrypt</p>
                </div>

                <button onClick={closeModal}>
                  <FontAwesomeIcon
                    icon={faTimes}
                    className="f-icon ab-position"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {isPayOpen && (
        <PaymentProvider
          stateOpen={setIsPayOpen}
          innerState={setIsInnerOpen}
          type={paymentType}
        />
      )}
    </>
  );
};

export default PurchaseTimeModal;
