import Link from "next/link";

const Home = () => {
  return (
    <div className="flex flex-col gap-3 justify-center items-center">
      <h1 className="text-center text-3xl font-bold py-3">Home Page</h1>
      <Link href={"./admin"}>Dashboard</Link>
      <Link href={"./admin/learning-journey"}>Learning Journey</Link>
      <Link href={"./admin/learning-materials"}>Learning Materials</Link>
      <Link href={"./admin/questionaries"}>Questionaries</Link>
    </div>
  );
};

export default Home;

// pagination[page]=2&pagination[pageSize]=34&sort=purpose:asc&populate=icon
