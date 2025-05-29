import React, { useContext } from "react";
import { PageContext } from "../contexts/PageProvider";

/** Sert a mettre en place une pagination avec le context PageContext
 * @param {int} elementPerPage le nombre d'élements à afficher par page
 * @param {int} totalElements le nombre total des éléments dans la liste 
 * @returns {JSX.Element} Outil de pagination pour circuler dans la liste
 */
const Pagination = ({ elementPerPage, totalElements }) => {

    // On calcul le nombre de pages
    const howManyPages = Math.ceil(totalElements/elementPerPage);

    // On appelle le contexte 
    const { page, setPage } = useContext(PageContext);

    // On crée une fonction qui s'implémentera dans la boucle pour changer de page
    const handleClick = (page, e) => {
        e.preventDefault();
        setPage(page);
    }

    // On crée la fonction pour revenir à la page précédente
    const handleClickPrevious = () => {
        if(page <= 1) {
            setPage(1);
        } else {
            setPage(page-1);
        }
    }

    // On crée la fonction pour aller à la page suivante
    const handleClickNext = () => {
        if(page >= howManyPages) {
            setPage(howManyPages);
        } else {
            setPage(page+1);
        }
    }


    return (
        <div className="pagination">
            <div className="previous" onClick={handleClickPrevious}>{"<"}</div>
            {(() => {
                const pages = [];
                for(let i = 1; i <= howManyPages ; i++) {
                    pages.push(<div key={i + "pagination"} onClick={(e)=>handleClick(i, e)} className={`number-page ${i===page ? "actual" : ""}`}>{i}</div>);
                }

                return pages;
            })()}
            <div className="next" onClick={handleClickNext}>{">"}</div>
        </div>
    )
}

export default Pagination;