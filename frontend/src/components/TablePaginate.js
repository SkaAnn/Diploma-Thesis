
import React from 'react'
import { Pagination } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const TablePaginate = ({ pages, page, screen, id }) => {
    return pages > 1 && (
        <Pagination>
            {[...Array(pages).keys()].map(x => (
                <LinkContainer key={x + 1}
                    to={
                        screen == 2 ? `/user/my/favorites/${x + 1}`
                            : screen == 3 ? `/products/user/${id}/${x + 1}`
                                : `/user/my/profile/page/${x + 1}`}>
                    <Pagination.Item active={x + 1 === page}>{x + 1}</Pagination.Item>
                </LinkContainer>
            ))}
        </Pagination>
    )
}

export default TablePaginate