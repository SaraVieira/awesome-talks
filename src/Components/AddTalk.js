import React from 'react'
import styled, { injectGlobal } from 'styled-components'
import { withFormik } from 'formik'
import { Mutation } from 'react-apollo'
import Modal from 'react-modal'
import remcalc from 'remcalc'
import Loading from '../assets/loading.svg'
import Button from './Styling/Button'
import CREATE_VIDEO from '../Queries/ADD_VIDEO'
import Input from './Styling/Input'

const TextArea = Input.extend`
    ~ span {
        bottom: ${remcalc(4)};
    }
`.withComponent('textarea')

injectGlobal`
    .ReactModalPortal {
        z-index: 10;
        position: relative;
    }
    .ReactModal__Content.ReactModal__Content--after-open {
        height: ${remcalc(350)};
    }

    @media (max-width: ${remcalc(768)}) {
        .ReactModal__Content.ReactModal__Content--after-open {
            width: 80%;
            height: ${remcalc(500)};
            z-index: 999;
        }
    }
`

const Name = styled.h2`
    font-weight: 400;
    font-size: ${remcalc(18)};
    color: ${props => props.theme.black};
    letter-spacing: ${remcalc(-0.63)};
`

const ErrorEl = styled.strong`
    font-weight: 400;
    display: block;
    margin-bottom: ${remcalc(15)};
    font-size: ${remcalc(18)};
    color: ${props => props.theme.red};
    letter-spacing: ${remcalc(-0.63)};
`

const Wrapper = styled.div`
    position: relative;
    margin-bottom: ${remcalc(20)};
`

const AddTalk = ({
    values,
    handleChange,
    handleBlur,
    setSubmitting,
    handleReset,
    modalIsOpen,
    close,
    submit,
    submitted,
    submitError
}) => (
    <Modal
        isOpen={modalIsOpen}
        onRequestClose={close}
        ariaHideApp={true}
        contentLabel="Add a Talk"
        role="dialog"
        aria={{
            labelledby: 'heading'
        }}
        style={{
            overlay: {
                backgroundColor: 'rgba(0,0,0,0.3)'
            },
            content: {
                color: '#666',
                border: 'none',
                borderRadius: 0,
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)'
            }
        }}
    >
        <Name id="heading"> Add a Talk </Name>
        <Mutation mutation={CREATE_VIDEO}>
            {(createVideos, { data, loading }) => (
                <form
                    onSubmit={e =>
                        submit(
                            e,
                            createVideos,
                            values,
                            setSubmitting,
                            handleReset
                        )
                    }
                >
                    {submitted ? (
                        <Name>
                            You are the Best{' '}
                            <span role="img" aria-label="party">
                                🎉
                            </span>
                        </Name>
                    ) : null}

                    {submitError ? <ErrorEl>{submitError}</ErrorEl> : null}
                    <Wrapper>
                        <Input
                            aria-label="Enter the title of the talk"
                            id="name"
                            placeholder="Enter the title of the talk"
                            type="text"
                            value={values.name}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            required
                        />
                        <span />
                    </Wrapper>
                    <Wrapper>
                        <Input
                            aria-label="Enter the Youtube Link"
                            id="link"
                            placeholder="Enter the Youtube Link"
                            type="text"
                            value={values.link}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            required
                        />
                        <span />
                    </Wrapper>
                    <Wrapper>
                        <TextArea
                            aria-label="Why do you love this talk ?"
                            id="moderatorNotes"
                            placeholder="Why do you love this talk ?"
                            type="text"
                            value={values.moderatorNotes}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        <span />
                    </Wrapper>
                    <Button
                        name="Add a Talks"
                        type="submit"
                        submitted={submitted}
                    >
                        {loading ? <img src={Loading} alt="Loading" /> : null}
                        {!loading && !submitted ? 'Submit' : null}
                        {submitted ? (
                            <svg className="checkmark" viewBox="0 0 70 70">
                                <path d="m31.5,46.5l15.3,-23.2" />
                                <path d="m31.5,46.5l-8.5,-7.1" />
                            </svg>
                        ) : null}
                    </Button>
                </form>
            )}
        </Mutation>
    </Modal>
)

export default withFormik({
    mapPropsToValues: () => ({ name: '', link: '', moderatorNotes: '' }),
    displayName: 'AddTalk'
})(AddTalk)
