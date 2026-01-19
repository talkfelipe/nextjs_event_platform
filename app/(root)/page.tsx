import Hello from "@/components/hello";

const Home = () => {

    console.log('What type of content am I?');
    return (
        <main>
            <div className="text-5xl underline">This fullstack app is being made to learn next.js</div>
            <Hello />
        </main>
    )
}
export default Home;
