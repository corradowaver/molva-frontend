import {getStringsByLocale} from "../../../../resources/languages";
import {connect} from 'react-redux';
import styles from "./Projects.module.css";
import {getProjectsByCategory} from "../../../../service/fakeDataService";
import React, {useEffect, useState} from "react";
import {Slide} from "@material-ui/core";
import Categories from "./categories/Categories";
import Carousel from "./carousel/Carousel";
import Preview from "./preview/Preview";
import useWindowSize from "../controls/helpers/useWindowSize";
import Fade from "@material-ui/core/Fade";
<<<<<<< HEAD
import {LoadingIndicator} from "../../helper/loading/LoadingIndicator";
=======
import {LoadingIndicator} from "../../helper/LoadingIndicator";
import {pages} from "../../../../resources/paths";
>>>>>>> 2e9a8e70dcfb71e0d55e5bce19653ee817e158b9

function Projects(props) {
    let strings = getStringsByLocale(props.locale);
    let PROJECT_CATEGORIES = [
        strings.appsCategory,
        strings.sitesCategory,
        strings.gamesCategory,
        strings.filmsCategory
    ]
    const [currentActiveCategory, setCurrentActiveCategory] = useState(0);
    const [projectsByActiveCategory, setProjectsByActiveCategory] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setError] = useState(false);
    let {width} = useWindowSize();
    useEffect(() => {
        // fetch(`https://api.example.com/projects/by/category/${currentActiveCategory}`)
        //     .then(res => res.json())
        //     .then(
        //         (result) => {
        setProjectsByActiveCategory(null);
        setIsLoaded(false);
        getProjectsByCategory(currentActiveCategory).then((projects) => {
            setProjectsByActiveCategory(projects)
            setIsLoaded(true);
            setError(false);
        })
        //         },
        //         (error) => {
        //             setIsLoaded(true);
        //             setError(error);
        //         }
        //     )
    }, [currentActiveCategory])
    const getSlider = () => {
        if (projectsByActiveCategory) {
            if (projectsByActiveCategory.length > 3 && width >= 1000) {
                return <Carousel slidesToShow={3} projects={projectsByActiveCategory} isLoaded={isLoaded}/>;
            } else {
                return <div className={styles.noSliderContainer}>
                    {
                        projectsByActiveCategory.map((project, i) =>
                            <Preview activeSrc={project.previewUrl}
                                     activeType={project.previewType}
                                     activeId={project.id}
                                     projectTitle={project.name}
                                     link={pages.PROJECT}
                                     isLoaded={isLoaded}
                                     autoplay={true}
                                     controls={false}
                                     size={0}
                                     key={i}/>
                        )
                    }
                </div>
            }
        } else {
            return <div className={styles.loaderContainer}>
                <LoadingIndicator previewSize={0}/>
            </div>
        }
    }
    return (
        <div className={styles.projects}>
            <div className={styles.projectsElementsContainer}>
                <Slide direction="right" in={true} mountOnEnter unmountOnExit>
                    <div>
                        <h1 className={styles.title}>{strings.projectsTitle}</h1>
                        <Categories
                            categories={PROJECT_CATEGORIES}
                            activeCategoryIndex={currentActiveCategory}
                            setCurrentActiveCategory={setCurrentActiveCategory}/>
                    </div>
                </Slide>
                {
                    <Fade in={true} timeout={360} mountOnEnter unmountOnExit>
                        <div className={styles.slider}>
                            {getSlider()}
                        </div>
                    </Fade>
                }
            </div>
        </div>
    );
}

const mapStateToProps = state => ({
    theme: state.style.theme,
    locale: state.language.locale
})

export default connect(mapStateToProps)(Projects);