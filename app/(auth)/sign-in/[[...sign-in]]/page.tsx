import { SignIn } from '@clerk/nextjs';

export default function Page() {
  return (
    <section className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      {/* Left Image */}
      <div className="relative hidden lg:block">
        <img
          src="/assets/images/img2.jpg"
          alt="Welcome Image"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0  bg-opacity-50 flex flex-col justify-center items-center text-white p-8">
          <h1 className="text-4xl text-orange-500 font-bold mb-4">Welcome to Momento</h1>
          <p className="text-lg text-white text-center max-w-md">
            Seamless Events, Lasting Memories!!
          </p>
        </div>
      </div>

      {/* Right SignIn Form */}
      <main className="flex items-center justify-center px-8 py-12 sm:px-12">
        <div className="w-full max-w-md space-y-6">
          <h2 className="text-3xl font-bold text-gray-900 ml-8">Sign in to your account</h2>
          <SignIn  />
        </div>
      </main>
    </section>
  );
}
