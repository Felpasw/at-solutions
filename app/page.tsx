import InputInitialPage from './components/InputInitialPage';

export default function Home() {
  return (
    <main className="h-full w-full flex flex-col items-center justify-center">
      <img src="/Logo-Governo.png" alt="" className="  self-center  w-[26%] min-w-[200px]" />
      <InputInitialPage />
    </main>
  );
}
