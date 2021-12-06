import React, { useEffect } from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { useForm, useFormState } from 'react-final-form';

import {
  AccordionSet,
  Button,
  Pane,
  PaneFooter,
  PaneHeader,
  Paneset,
} from '@folio/stripes/components';
import {
  CorrespondingAuthorForm,
  FundingForm,
  PublicationForm,
  PublicationStatusForm,
  RequestContactForm,
  RequestInfoForm
} from '../../PublicationRequestFormSections';

const propTypes = {
  handlers: PropTypes.shape({
    onClose: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired
  }).isRequired,
  pristine: PropTypes.bool,
  publicationRequest: PropTypes.object,
  submitting: PropTypes.bool,
};


const PublicationRequestForm = ({ handlers: { onClose, onSubmit }, pristine, publicationRequest, submitting }) => {
  const { values } = useFormState();
  const { change } = useForm();

  useEffect(() => {
    if (
      values.useCorrespondingAuthor &&
      values.requestContact?.partyOwner !== values.correspondingAuthor?.partyOwner
    ) {
      change('requestContact.partyOwner', values.correspondingAuthor?.partyOwner);
    }
  }, [change, values]);

  const renderPaneFooter = () => {
    return (
      <PaneFooter
        renderEnd={(
          <Button
            buttonStyle="primary mega"
            disabled={pristine || submitting}
            marginBottom0
            onClick={onSubmit}
            type="submit"
          >
            <FormattedMessage id="stripes-components.saveAndClose" />
          </Button>
        )}
        renderStart={(
          <Button
            buttonStyle="default mega"
            marginBottom0
            onClick={() => onClose()}
          >
            <FormattedMessage id="stripes-components.cancel" />
          </Button>
        )}
      />
    );
  };

  const renderPaneTitle = () => (
    publicationRequest ?
      <FormattedMessage id="ui-oa.publicationRequest.editPublicationRequest" values={{ id: publicationRequest.requestNumber }} /> :
      <FormattedMessage id="ui-oa.publicationRequest.createPublicationRequest" />
  );

  return (
    <Paneset>
      <Pane
        centerContent
        defaultWidth="100%"
        footer={renderPaneFooter()}
        renderHeader={renderProps => <PaneHeader {...renderProps} paneTitle={renderPaneTitle()} />}
      >
        <AccordionSet>
          <RequestInfoForm />
          <CorrespondingAuthorForm />
          <RequestContactForm />
          <PublicationForm />
          <PublicationStatusForm />
          <FundingForm />
        </AccordionSet>
      </Pane>
    </Paneset>
  );
};

PublicationRequestForm.propTypes = propTypes;

export default PublicationRequestForm;