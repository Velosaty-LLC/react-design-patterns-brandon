import React from "react";
import { BashCode, ContainerDataSource, ContainerGeneric, ContainerLoader, ContainerRender, CurrentUser, CustomTitle } from "./index.components";
import { CustomTitleStyle, SectionWrapper } from "../styledcomponents/styled.components";
import UserInfo from "./user.info.component";
import BookInfo from "./books.info.component";
import { usePatternsAppContext } from "../context";

/**react-design-patterns-app - version 3.17 - ContainerPattern
 * - Features: 
 * 
 *     --> Importing and placing 'BashCode' component.
 * 
 *     --> Placing 'currentusercode'.
 * 
 * Note: 'ContainerRender' is a variation of 
 * 'ContainerDaraSource' a more flexible version taking in count 
 * that 'ContainerRender' will be unaware of the data source
 */

const ContainerPattern = () => {

    const { getDataFromServer, CodeData } = usePatternsAppContext();

    //console.log({ CodeData })

    const currentuser = CodeData[10].code;

    return(
        <div>
            <CustomTitleStyle>
                <CustomTitle  title={<p className="container-pattern"><span >Container Pattern</span></p>} />
            </CustomTitleStyle>

            <SectionWrapper>
            <p> 
                Container components patterns are React components responsible 
                for <span className="text-white font-semibold"> managing data </span> 
                loading and handling on <span className="text-white font-semibold"> behalf of their child components. </span> 
                Instead of each child component managing its data retrieval independently, <span className="text-white font-semibold"> container 
                components extract and centralize this logic </span>, allowing multiple child components to 
                <span className="text-white font-semibold"> share the same data-loading process. </span> 
            </p>

            <p>
                The <span className="text-white font-semibold"> primary goal is to shield child components from the specifics of data management </span> 
                by extracting data-loading logic into dedicated containers, ensuring components remain <span className="text-white font-semibold"> unaware 
                of data sources and management processes.</span> This approach promotes <span className="text-white font-semibold"> reusability, separation of concerns, 
                and simplifies component logic </span> by handling data retrieval and passing it down to 
                <span className="text-white font-semibold"> child components via props. </span>
            </p>

            <p>
                the following list is is <span className="text-white font-semibold"> compose </span> by a container <span className="text-white font-semibold"> {'<CurrentUser>'} </span>
                that will perform the following data sourcing and handling:
                
            </p>

            <BashCode code={currentuser}/>

            <ul>
                <li>
                    <span className="text-white font-semibold"> will create the state of the user </span>
                </li>
                <li>
                    <span className="text-white font-semibold"> receive the user data from the server </span>
                </li>
                <li>
                <span className="text-white font-semibold"> mutate that data and provide it to the children </span>
                </li>
            </ul>

            <p>
                 that data to the children in this case <span className="text-white font-semibold">{'<UserInfo />'} </span>, 
                 resulting as follows:
            </p>

            <CurrentUser>
                <UserInfo />
            </CurrentUser>

            <p>
                this can be a custom test using custom user info from 3 records, being the third one, resulting as follows:
            </p>

            <ContainerLoader userId={'3'}>
                <UserInfo/>
            </ContainerLoader>

            <p>
                the <span className="text-white font-semibold">key is to codify a piece of code </span> 
                that <span className="text-white font-semibold">can scalate with few modifications </span>, the previous test, with small 
                modification can become highly scalable as follows for the first user:
            </p>

            <ContainerGeneric resourceUrl={'/users/1'} resourceName={'user'}>
                <UserInfo />
            </ContainerGeneric>

            <p>
                and for the second user will be as this:
            </p>
            
            <ContainerGeneric resourceUrl={'/users/2'} resourceName={'user'}>
                <UserInfo />
            </ContainerGeneric>

            <p>
                and <span className="text-white font-semibold">rehusing </span> this component for example for books:
            </p>

            <ContainerGeneric resourceUrl={'/books/1'} resourceName={'book'}>
                <BookInfo/>
            </ContainerGeneric>

            <p>
                can be notice that the pattern for the resourceName follows a 
                singular notation ( this is because is getting rendered the 
                single element of each dataset in the end component, that's 
                why it is not use the plural, and technical reasons are in 
                consideration by the prop in the end component), the correct
                use of names on endpoints and props is also very important
            </p>

            <CustomTitleStyle>
                <CustomTitle  title={<p className="container-data-source"><span >Container Data Source</span></p>} />
            </CustomTitleStyle>

            <p>
                and even more custom container can be , that by handling the data 
                source makes the end component more independent and efficient by doing 
                less tasks, and giving the opportunity of relocating resources as follows:  
            </p>

            <ContainerDataSource getData={ () => getDataFromServer('/books/3')}
            resourceName={'book'}
            >
                <BookInfo />
            </ContainerDataSource>

            <p>
                this example above is very much use in situations where bussines logic ( like 
                handlers or other data related functionalities need to be separated of the 
                layout ), in order to secure the sources
            </p>

            <CustomTitleStyle>
                <CustomTitle  title={<p className="container-render-pattern"><span >Container Render Pattern</span></p>} />
            </CustomTitleStyle>

            <p>
                the container 'ContainerRender' pattern is a variation
                of the ContainerDataSource, that use the render prop to pass 
                the end component and his props, this variation has technical 
                reasons        
            </p>

            <ContainerRender 
                getData={ () => getDataFromServer('/books/2')} 
                render={(resource) => <BookInfo book={resource}/>} />

            </SectionWrapper>
        </div>
    )
}

export default ContainerPattern;