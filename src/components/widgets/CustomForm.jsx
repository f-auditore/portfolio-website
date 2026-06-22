import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import commonData from "../../data/stringData";
import { BodyNormal, BodySmallNormal } from "./CustomText";

// eslint-disable-next-line no-empty-pattern
export function DefaultForm({}) {
  const [message, setMessage] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const maxLength = 1024;

  const form = useRef();

  const validateForm = () => {
    let newErrors = {};
    let isValid = true;

    if (!form.current["form-name"].value) {
      newErrors.name = "Name cannot be empty.";
      isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!form.current["form-email"].value) {
      newErrors.email = "Email cannot be empty.";
      isValid = false;
    } else if (!emailRegex.test(form.current["form-email"].value)) {
      newErrors.email = "Please enter a valid email address.";
      isValid = false;
    }

    if (!form.current["form-message"].value) {
      newErrors.message = "Message cannot be empty.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const sendEmail = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      console.log("Validation failed. Please correct the errors.");
      return;
    }

    emailjs
      .sendForm("service_souwg6s", "template_oxsatl2", form.current, {
        publicKey: "QnosnqCuOFr6KnVK0",
      })
      .then(
        () => {
          console.log("SUCCESS!");
          setIsSubmitted(true);
          setMessage("");
          form.current.reset();

          setTimeout(() => setIsSubmitted(false), 5000);
        },
        (error) => {
          console.log("FAILED...", error.text);
        }
      );
  };

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  return (
    <div className="flex flex-col w-full h-full gap-y-7">
      <form ref={form} onSubmit={sendEmail}>
        <div className="mb-16">
          <label
            htmlFor="name"
            className="font-semibold text-lg text-neutral-700"
          >
            Name
          </label>
          <input
            id="name"
            type="text"
            name="form-name"
            placeholder="Insert your name"
            className="mt-3 w-full text-neutral-600 rounded-lg p-16 font-semibold text-sm placeholder:text-neutral-400 placeholder:font-normal bg-white focus:outline-primary-main outline-1 outline-neutral-200"
            required
          />
          {errors.name && (
            <p className="mt-2 text-sm text-danger-main">{errors.name}</p>
          )}
        </div>

        <div className="mb-16">
          <label
            htmlFor="email"
            className="font-semibold text-lg text-neutral-700"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            name="form-email"
            placeholder="john.doe@company.com"
            className="mt-3 w-full text-neutral-600 rounded-lg p-16 font-semibold text-sm placeholder:text-neutral-400 placeholder:font-normal bg-white focus:outline-primary-main outline-1 outline-neutral-200"
            required
          />
          {errors.email && (
            <p className="mt-2 text-sm text-danger-main">{errors.email}</p>
          )}
        </div>

        <div className="mb-8">
          <label
            htmlFor="message"
            className="font-semibold text-lg text-neutral-700"
          >
            Message
          </label>
          <div className="relative mb-8">
            <textarea
              rows="4"
              id="message"
              name="form-message"
              maxLength={maxLength}
              placeholder="Write your thoughts here..."
              value={message}
              onChange={handleMessageChange}
              className="
              resize-none
              p-16
              overflow-y-auto
              max-h-60
              h-60
              min-h-60
              2xl:max-h-72
              xl:max-h-55
              2xl:h-72
              xl:h-55
              2xl:min-h-72
              xl:min-h-55
              mt-3
              w-full
              text-neutral-600
              rounded-lg
              font-semibold
              text-sm
              placeholder:text-neutral-400
              placeholder:font-normal
              bg-white
              focus:outline-primary-main
              outline-1
              outline-neutral-200"
              required
            />
            <div className="absolute bottom-16 right-16 text-xs 2xl:text-sm font-semibold 2xl:font-normal text-neutral-500">
              <span>{message.length}</span> / <span>{maxLength}</span>
            </div>
          </div>
          {errors.message && (
            <p className="mt-2 text-sm text-danger-main">{errors.message}</p>
          )}
        </div>
        <BodySmallNormal text={commonData.messageNote} color="text-neutral-400" className="relative mb-8 italic"/>
        <div
          className="
        flex
        flex-col
        2xl:flex-row
        xl:flex-row
        w-full
        2xl:gap-x-3
        xl:gap-x-3
        gap-y-3
        2xl:gap-y-0
        xl:gap-y-0
        items-center
        "
        >
          <button
            type="submit"
            className="
            px-32
            py-16
            justify-center
            flex
            rounded-lg
            2xl:rounded-xl
            xl:rounded-xl
            w-full
            2xl:w-fit
            xl:w-fit
            font-semibold
            text-l
            bg-primary-main
            hover:bg-primary-hover
            text-neutral-50
            cursor-pointer
            "
          >
            Submit
          </button>
          {isSubmitted && (
            <BodyNormal
              text="Thank you! Your message has been successfully sent."
              color="text-success-main"
            />
          )}
        </div>
      </form>
    </div>
  );
}

export default DefaultForm;