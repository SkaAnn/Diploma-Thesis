import React from 'react'
import { Pagination } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const Paginate = ({ pages, page, sortKey = '', keyword = '' }) => {
    return pages > 1 && (
        <Pagination>
            {[...Array(pages).keys()].map(x => (
                <LinkContainer key={x + 1}
                    to={
                        sortKey && keyword
                            ? `/sort/${sortKey}/search/${keyword}/page/${x + 1}`
                            : sortKey && !keyword
                                ? `/sort/${sortKey}/page/${x + 1}`
                                : !sortKey && keyword
                                    ? `/search/${keyword}/page/${x + 1}`
                                    : `/page/${x + 1}`
                    }>
                    <Pagination.Item active={x + 1 === page}>{x + 1}</Pagination.Item>
                </LinkContainer>
            ))}
        </Pagination>
    )
}

export default Paginate
