import PropTypes from 'prop-types';

import { FormattedMessage } from 'react-intl';

import {
  Accordion,
  Badge,
  MultiColumnList,
  Row,
  FormattedUTCDate,
} from '@folio/stripes/components';

import getSortedItems from '../../../util/getSortedItems';

const propTypes = {
  request: PropTypes.object,
};

const formatter = {
  publicationStatus: (e) => {
    return e?.publicationStatus?.label;
  },
  statusDate: (e) => {
    return <FormattedUTCDate value={e?.statusDate} />;
  },
};

const renderBadge = (publicationStatuses) => {
  return <Badge>{publicationStatuses?.length ?? 0}</Badge>;
};

const PublicationStatus = ({ request }) => {
  const sortedStatuses = getSortedItems(request?.publicationStatuses, null, {
    column: 'statusDate',
    direction: 'desc',
  });

  return (
    <Accordion
      closedByDefault
      displayWhenClosed={renderBadge(request?.publicationStatuses)}
      displayWhenOpen={renderBadge(request?.publicationStatuses)}
      label={
        <FormattedMessage id="ui-oa.publicationRequest.publicationStatus" />
      }
    >
      <Row>
        <MultiColumnList
          columnMapping={{
            publicationStatus: (
              <FormattedMessage id="ui-oa.publicationStatus.status" />
            ),
            statusDate: (
              <FormattedMessage id="ui-oa.publicationRequest.statusDate" />
            ),
            statusNote: (
              <FormattedMessage id="ui-oa.publicationRequest.statusNote" />
            ),
          }}
          columnWidths={{ statusNote: 300 }}
          contentData={sortedStatuses}
          formatter={formatter}
          interactive={false}
          visibleColumns={['publicationStatus', 'statusDate', 'statusNote']}
        />
      </Row>
    </Accordion>
  );
};

PublicationStatus.propTypes = propTypes;

export default PublicationStatus;
