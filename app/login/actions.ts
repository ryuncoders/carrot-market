"use server";

export async function handleForm(prevState: any, formData: FormData) {
  console.log(formData.get("email"), formData.get("password"));
  console.log("i run in the server!");
  return {
    errors: ["wrong password", "password too short"],
  };
}
