'use server';
import { signIn } from '@/auth.config';
import { AuthError } from 'next-auth';


export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    const resp = await signIn('credentials', Object.fromEntries(formData));

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