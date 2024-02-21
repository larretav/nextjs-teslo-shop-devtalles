'use server';
import { signIn } from '@/auth.config';
import { sleep } from '@/utils';
import { AuthError } from 'next-auth';


export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {

  try {
    // await sleep(2)
    const resp = await signIn('credentials', formData);
    console.log(resp)

  } catch (error) {
    
    // if (error instanceof AuthError) {
    //   switch (error.type) {
    //     case 'CredentialsSignin':
    //       return 'Invalid credentials.';
    //     default:
    //       return 'Something went wrong.';
    //   }
    // }
    return 'CredentialsSignin';
  }
}