import React from 'react';
import PropTypes from 'prop-types';

import {
  Button,
  ButtonGroup,
  MultiColumnList,
  Pane,
  PaneMenu,
} from '@folio/stripes/components';

import {
  SearchAndSortQuery,
  PersistedPaneset,
} from '@folio/stripes/smart-components';
import { FormattedMessage } from 'react-intl';
import { useHistory } from 'react-router-dom';
import {
  AppIcon,
  IfPermission
} from '@folio/stripes/core';

import urls from '../../../util/urls';

import OAFilters from '../../OAFilters';

const propTypes = {
  children: PropTypes.object,
  publicationRequests: PropTypes.arrayOf(PropTypes.object),
  queryGetter: PropTypes.func.isRequired,
  querySetter: PropTypes.func.isRequired,
  data: PropTypes.object,
  searchString: PropTypes.string
};

const PublicationRequests = ({
  children,
  data,
  queryGetter,
  querySetter,
  searchString,
}) => {
  const history = useHistory();

  const query = queryGetter() ?? {};
  const sortOrder = query.sort ?? '';

  const formatter = {
    requestNumber: d => (
      <AppIcon
        app="oa"
        iconAlignment="baseline"
        iconKey="app"
        size="small"
      >
        {d?.requestNumber}
      </AppIcon>
    ),
    requestStatus: d => (
      d?.requestStatus?.label
    ),
    correspondingAuthorName: d => (
      d.correspondingAuthor?.partyOwner ?
        d.correspondingAuthor.partyOwner.familyName + ', ' + d.correspondingAuthor.partyOwner.givenNames :
        ''
    )
  };
  return (
    <SearchAndSortQuery
      initialSearchState={{ query: '' }}
      initialSortState={{ sort: '-requestDate' }}
      queryGetter={queryGetter}
      querySetter={querySetter}
      sortableColumns={['requestNumber', 'requestDate', 'requestStatus', 'publicationTitle']}
    >
      {
        ({
          activeFilters,
          filterChanged,
          getFilterHandlers,
          getSearchHandlers,
          onSort,
          onSubmitSearch,
          resetAll,
          searchChanged,
          searchValue
        }) => {
          const disableReset = !filterChanged && !searchChanged;
          return (
            <div>
              <PersistedPaneset
                appId="@folio/oa"
                id="oa-paneset"
              >
                <Pane
                  defaultWidth="20%"
                  paneTitle={<FormattedMessage id="stripes-smart-components.searchAndFilter" />}
                >
                  <form onSubmit={onSubmitSearch}>
                    <ButtonGroup fullWidth>
                      <Button
                        buttonStyle="primary"
                        id="clickable-nav-oa-publication-requests"
                      >
                        <FormattedMessage id="ui-oa.publicationRequests.requests" />
                      </Button>
                      <Button
                        id="clickable-nav-oa-something-else"
                        to={urls.publicationRequests()}
                      >
                        <FormattedMessage id="ui-oa.publicationRequests.requests" />
                      </Button>
                    </ButtonGroup>
                    <OAFilters
                      activeFilters={activeFilters.state}
                      disableReset={disableReset}
                      filterHandlers={getFilterHandlers()}
                      resetAll={resetAll}
                      searchHandlers={getSearchHandlers()}
                      searchValue={searchValue}
                    />
                  </form>
                </Pane>
                <Pane
                  appIcon={<AppIcon app="oa" iconKey="app" size="small" />}
                  defaultWidth="fill"
                  lastMenu={(
                    <IfPermission perm="oa.publicationRequest.edit">
                      <PaneMenu>
                        <FormattedMessage id="ui-oa.publicationRequest.createPublicationRequest">
                          {ariaLabel => (
                            <Button
                              aria-label={ariaLabel}
                              buttonStyle="primary"
                              id="clickable-new-publication-request"
                              marginBottom0
                              to={`${urls.publicationRequestCreate()}`}
                            >
                              <FormattedMessage id="stripes-smart-components.new" />
                            </Button>
                          )}
                        </FormattedMessage>
                      </PaneMenu>
                    </IfPermission>
                  )}
                  paneSub={data?.publicationRequests !== undefined ?
                    <FormattedMessage id="ui-oa.publicationRequests.recordsFound" values={{ number: data?.publicationRequests?.length }} /> : ''}
                  paneTitle={<FormattedMessage id="ui-oa.publicationRequests" />}
                >
                  <MultiColumnList
                    autosize
                    columnMapping={{
                      requestNumber: <FormattedMessage id="ui-oa.publicationRequest.requestNumber" />,
                      requestDate: <FormattedMessage id="ui-oa.publicationRequest.requestDate" />,
                      requestStatus: <FormattedMessage id="ui-oa.publicationRequest.status" />,
                      publicationTitle: <FormattedMessage id="ui-oa.publicationRequest.publicationTitle" />,
                      correspondingAuthorName: <FormattedMessage id="ui-oa.publicationRequest.correspondingAuthorName" />,
                    }}
                    contentData={data.publicationRequests}
                    formatter={formatter}
                    onHeaderClick={onSort}
                    onRowClick={(_e, rowData) => history.push(`${urls.publicationRequest(rowData.id)}${searchString}`)}
                    sortDirection={sortOrder.startsWith('-') ? 'descending' : 'ascending'}
                    sortOrder={sortOrder.replace(/^-/, '').replace(/,.*/, '')}
                    visibleColumns={['requestNumber', 'requestDate', 'requestStatus', 'publicationTitle', 'correspondingAuthorName']}
                  />
                </Pane>
                {children}
              </PersistedPaneset>
            </div>
          );
        }
      }
    </SearchAndSortQuery>
  );
};

PublicationRequests.propTypes = propTypes;

export default PublicationRequests;